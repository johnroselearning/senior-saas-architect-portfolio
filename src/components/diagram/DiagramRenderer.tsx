import { MermaidDiagram } from "./MermaidDiagram";

// Tagged union — to add a new engine, add a variant and a case below.
// Consumers only deal with `DiagramSpec`, never with the underlying library.
export type DiagramSpec = { kind: "mermaid"; source: string };

export function DiagramRenderer({ spec }: { spec: DiagramSpec }) {
  switch (spec.kind) {
    case "mermaid":
      return <MermaidDiagram source={spec.source} />;
    default: {
      const _exhaustive: never = spec.kind;
      return <span>Unknown diagram kind: {_exhaustive}</span>;
    }
  }
}
