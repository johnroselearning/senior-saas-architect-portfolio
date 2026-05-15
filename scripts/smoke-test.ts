/**
 * smoke-test.ts
 * Run with: npx tsx scripts/smoke-test.ts
 * Verifies that both portfolio tools import and execute correctly.
 */
import { getProfessionalBio, getGithubMetrics, portfolioTools } from "../src/tools/portfolio.js";

console.log("✅ Module imported successfully");
console.log(`   Tool 1 name  : ${getProfessionalBio.name}`);
console.log(`   Tool 2 name  : ${getGithubMetrics.name}`);
console.log(`   portfolioTools count: ${portfolioTools.length}`);

// --- Test get_professional_bio ---
const bio = await getProfessionalBio.invoke({});
if (!bio.includes("John Rose")) {
  throw new Error("bio content sanity check failed — 'John Rose' not found");
}
console.log(`   bio.md size  : ${bio.length} chars`);
console.log(`   bio.md head  : ${bio.split("\n")[0]}`);

// --- Test get_github_metrics (live network call) ---
const metricsRaw = await getGithubMetrics.invoke({ username: "johnroselearning" });
const metrics = JSON.parse(metricsRaw) as {
  username: string;
  repositories: { name: string; stars: number; language: string; url: string }[];
};
console.log(`   GitHub user  : ${metrics.username}`);
console.log(`   Repo count   : ${metrics.repositories.length}`);
if (metrics.repositories.length > 0) {
  const first = metrics.repositories[0]!;
  console.log(`   Top repo     : ${first.name} (${first.language}, ⭐ ${first.stars})`);
  console.log(`   URL          : ${first.url}`);
}

console.log("\n🎉 All smoke tests passed.");
