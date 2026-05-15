/**
 * portfolio.ts
 *
 * Local-knowledge tools for the portfolio agent.
 * These tools are designed to run on the Node.js server side only —
 * they are NOT imported by any Vite browser bundle.
 *
 * Tools exposed:
 *   - get_professional_bio   Reads data/bio.md synchronously from disk.
 *   - get_github_metrics     Fetches the top-5 most recently active repos
 *                            for a given GitHub username via the public REST API.
 */

import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Path helpers — __dirname equivalent in Node ESM
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Resolves a path relative to the project root (two levels up from src/tools/).
 * src/tools/portfolio.ts  →  ../../  →  project root
 */
function fromRoot(...segments: string[]): string {
  return resolve(__dirname, "..", "..", ...segments);
}

// ---------------------------------------------------------------------------
// Tool 1 — get_professional_bio
// ---------------------------------------------------------------------------
/**
 * Reads the local `data/bio.md` file and returns its full text content.
 *
 * Design rationale:
 *   - Avoids any vector database round-trip for static profile data.
 *   - The file is small (<10 KB) and fully structured markdown — the LLM
 *     can parse it directly without chunking or embedding.
 *   - Throwing a descriptive error lets the agent gracefully surface file
 *     misconfiguration rather than silently returning empty context.
 */
export const getProfessionalBio = tool(
  async (): Promise<string> => {
    const bioPath = fromRoot("data", "bio.md");

    let content: string;
    try {
      content = await readFile(bioPath, { encoding: "utf-8" });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : String(err);
      throw new Error(
        `[get_professional_bio] Failed to read bio file at "${bioPath}": ${message}`
      );
    }

    if (!content.trim()) {
      throw new Error(
        `[get_professional_bio] Bio file at "${bioPath}" exists but is empty.`
      );
    }

    return content;
  },
  {
    name: "get_professional_bio",
    description:
      "Returns the full professional biography of John Rose as a markdown string. " +
      "Use this tool when the user asks about career history, skills, technical stack, " +
      "current role, achievements, project experience (Sentinel, TriagePulse AI), " +
      "or any general background about the portfolio owner.",
    schema: z.object({}),
  }
);

// ---------------------------------------------------------------------------
// Tool 2 — get_github_metrics
// ---------------------------------------------------------------------------

/** Shape returned by the GitHub REST API per-repository object. */
interface GithubApiRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  pushed_at: string; // ISO 8601 — used for sorting; stripped from output
}

/** Minimal, token-efficient shape returned to the agent. */
interface RepoSummary {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

/**
 * Fetches the top-5 most recently active public repositories for a GitHub user.
 *
 * Design rationale:
 *   - Uses the public GitHub REST API (no auth required for public repos).
 *   - Requests up to 100 repos sorted by `pushed` desc so the most active
 *     projects surface first, then slices to the top 5.
 *   - Only the five properties meaningful to a portfolio conversation are
 *     forwarded — this keeps the tool's token payload small (<300 tokens).
 *   - Null values are normalised to empty strings to avoid downstream
 *     agent confusion from JSON nulls.
 */
export const getGithubMetrics = tool(
  async ({ username }: { username: string }): Promise<string> => {
    const url =
      `https://api.github.com/users/${encodeURIComponent(username)}/repos` +
      `?sort=pushed&direction=desc&per_page=100&type=public`;

    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          // Use a descriptive User-Agent as required by GitHub API policy.
          "User-Agent": "portfolio-agent/1.0 (github.com/johnroselearning)",
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(
        `[get_github_metrics] Network request to GitHub API failed: ${message}`
      );
    }

    if (!response.ok) {
      const body = await response.text().catch(() => "(unreadable)");
      throw new Error(
        `[get_github_metrics] GitHub API returned ${response.status} ${response.statusText}. ` +
          `Body: ${body}`
      );
    }

    const repos: GithubApiRepo[] = await response.json() as GithubApiRepo[];

    if (!Array.isArray(repos) || repos.length === 0) {
      return JSON.stringify({ username, repositories: [] });
    }

    // Map to the minimal token-efficient shape; slice to top 5.
    const top5: RepoSummary[] = repos.slice(0, 5).map((repo) => ({
      name: repo.name,
      description: repo.description ?? "",
      stars: repo.stargazers_count,
      language: repo.language ?? "Unknown",
      url: repo.html_url,
    }));

    return JSON.stringify({ username, repositories: top5 }, null, 2);
  },
  {
    name: "get_github_metrics",
    description:
      "Fetches the top 5 most recently active public GitHub repositories for a given username. " +
      "Returns a JSON string containing the username and an array of repository summaries, " +
      "each with: name, description, stars (stargazers_count), primary language, and URL. " +
      "Use this tool when the user asks about GitHub activity, open-source projects, " +
      "coding languages used, or repository star counts.",
    schema: z.object({
      username: z
        .string()
        .min(1)
        .describe(
          "The GitHub username to query. Example: 'johnroselearning'"
        ),
    }),
  }
);

// ---------------------------------------------------------------------------
// Barrel export — import { portfolioTools } from "@/src/tools/portfolio"
// ---------------------------------------------------------------------------
export const portfolioTools = [getProfessionalBio, getGithubMetrics] as const;

export type PortfolioToolName =
  | typeof getProfessionalBio.name
  | typeof getGithubMetrics.name;
