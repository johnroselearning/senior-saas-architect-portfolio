import { useState } from "react";
import { Copy, Check } from "lucide-react";

type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "builtin"
  | "decorator"
  | "number"
  | "class"
  | "fn"
  | "dunder"
  | "operator"
  | "punct"
  | "plain";

const KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally",
  "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
  "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

const BUILTINS = new Set([
  "print", "len", "range", "str", "int", "float", "list", "dict", "set",
  "tuple", "bool", "type", "isinstance", "sorted", "enumerate", "zip", "map",
  "filter", "open", "self", "super", "Any", "Dict", "List", "Tuple", "Optional",
  "Set",
]);

const COLORS: Record<TokenType, string> = {
  comment: "text-slate-500 italic",
  string: "text-emerald-300",
  keyword: "text-fuchsia-400",
  builtin: "text-sky-300",
  decorator: "text-amber-300",
  number: "text-amber-300",
  class: "text-cyan-300",
  fn: "text-blue-300",
  dunder: "text-violet-300",
  operator: "text-slate-300",
  punct: "text-slate-400",
  plain: "text-slate-200",
};

function classifyIdentifier(word: string, prevToken: string | null): TokenType {
  if (KEYWORDS.has(word)) return "keyword";
  if (word.startsWith("__") && word.endsWith("__")) return "dunder";
  if (BUILTINS.has(word)) return "builtin";
  if (prevToken === "def") return "fn";
  if (prevToken === "class") return "class";
  if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) return "class";
  return "plain";
}

function tokenizePython(line: string): { type: TokenType; value: string }[] {
  const tokens: { type: TokenType; value: string }[] = [];
  let i = 0;
  let prevWord: string | null = null;

  while (i < line.length) {
    const ch = line[i];

    // Comment — consumes the rest of the line
    if (ch === "#") {
      tokens.push({ type: "comment", value: line.slice(i) });
      break;
    }

    // String: f"...", "...", '...' (single-line only — sufficient for the snippet)
    if (ch === '"' || ch === "'" || (ch === "f" && (line[i + 1] === '"' || line[i + 1] === "'"))) {
      const start = i;
      if (ch === "f") i += 1;
      const quote = line[i];
      i += 1;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\" && i + 1 < line.length) i += 2;
        else i += 1;
      }
      i += 1;
      tokens.push({ type: "string", value: line.slice(start, i) });
      prevWord = null;
      continue;
    }

    // Decorator
    if (ch === "@" && /[A-Za-z_]/.test(line[i + 1] ?? "")) {
      const start = i;
      i += 1;
      while (i < line.length && /[A-Za-z0-9_.]/.test(line[i])) i += 1;
      tokens.push({ type: "decorator", value: line.slice(start, i) });
      prevWord = null;
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      const start = i;
      while (i < line.length && /[0-9._]/.test(line[i])) i += 1;
      tokens.push({ type: "number", value: line.slice(start, i) });
      prevWord = null;
      continue;
    }

    // Identifier
    if (/[A-Za-z_]/.test(ch)) {
      const start = i;
      while (i < line.length && /[A-Za-z0-9_]/.test(line[i])) i += 1;
      const word = line.slice(start, i);
      tokens.push({ type: classifyIdentifier(word, prevWord), value: word });
      prevWord = word;
      continue;
    }

    // Whitespace
    if (ch === " " || ch === "\t") {
      const start = i;
      while (i < line.length && (line[i] === " " || line[i] === "\t")) i += 1;
      tokens.push({ type: "plain", value: line.slice(start, i) });
      continue;
    }

    // Operators & punctuation
    if (/[(){}\[\],:;]/.test(ch)) {
      tokens.push({ type: "punct", value: ch });
      i += 1;
      prevWord = null;
      continue;
    }
    if (/[=+\-*/<>!%&|^~]/.test(ch)) {
      const start = i;
      while (i < line.length && /[=+\-*/<>!%&|^~]/.test(line[i])) i += 1;
      tokens.push({ type: "operator", value: line.slice(start, i) });
      prevWord = null;
      continue;
    }

    tokens.push({ type: "plain", value: ch });
    i += 1;
  }

  return tokens;
}

export function PythonCodeWindow({
  filename,
  source,
}: {
  filename: string;
  source: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = source.replace(/\n$/, "").split("\n");
  const gutterWidth = String(lines.length).length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; silent
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[11px] text-slate-400 tracking-tight">
            {filename}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto">
        <pre className="text-[12.5px] leading-6 font-mono py-4">
          {lines.map((line, idx) => (
            <div key={idx} className="flex hover:bg-slate-900/60">
              <span
                className="select-none shrink-0 pl-4 pr-4 text-right text-slate-600 border-r border-slate-800/80"
                style={{ width: `${gutterWidth + 2}ch` }}
              >
                {idx + 1}
              </span>
              <code className="pl-4 pr-6 whitespace-pre">
                {tokenizePython(line).map((tok, i) => (
                  <span key={i} className={COLORS[tok.type]}>
                    {tok.value}
                  </span>
                ))}
                {line.length === 0 ? " " : ""}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
