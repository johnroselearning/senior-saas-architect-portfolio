import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;
const STEP = 0.2;

const clamp = (v: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(v.toFixed(2))));

export function ZoomableDiagram({ source }: { source: string }) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const zoomIn = () => setScale((s) => clamp(s + STEP));
  const zoomOut = () => setScale((s) => clamp(s - STEP));
  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const canPan = scale > 1;

  const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!canPan) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };

  const stopDrag = () => setDragging(false);

  const cursor = dragging ? "grabbing" : canPan ? "grab" : "default";

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage:
          "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Control dock */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-0.5 p-1 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
          title="Zoom in"
          className="w-7 h-7 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
          title="Zoom out"
          className="w-7 h-7 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-colors"
        >
          <Minus className="w-4 h-4" strokeWidth={2.25} />
        </button>
        <span className="w-px h-4 bg-slate-200 mx-0.5" />
        <button
          type="button"
          onClick={reset}
          aria-label="Reset zoom"
          title="Reset"
          className="w-7 h-7 inline-flex items-center justify-center rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.25} />
        </button>
      </div>

      {/* Scale readout */}
      <span className="absolute bottom-3 right-3 z-20 font-mono text-[10px] uppercase tracking-widest text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200 rounded px-2 py-0.5">
        {Math.round(scale * 100)}%
      </span>

      {/* Canvas */}
      <div
        className="p-6 md:p-8 flex justify-center"
        style={{ cursor, touchAction: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div
          className="w-full [&_svg]:mx-auto"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragging ? "none" : "transform 200ms ease-out",
          }}
        >
          <MermaidDiagram source={source} />
        </div>
      </div>
    </div>
  );
}
