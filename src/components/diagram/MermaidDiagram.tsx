import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  themeVariables: {
    primaryColor: "#ecfdf5",
    primaryTextColor: "#0f172a",
    primaryBorderColor: "#059669",
    lineColor: "#64748b",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
  flowchart: {
    curve: "basis",
    padding: 16,
  },
});

export function MermaidDiagram({ source }: { source: string }) {
  const rawId = useId();
  const id = `mmd-${rawId.replace(/[^a-zA-Z0-9-]/g, "")}`;
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    mermaid
      .render(id, source)
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [source, id]);

  if (error) {
    return (
      <pre className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-4 overflow-auto">
        {error}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-container w-full overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
