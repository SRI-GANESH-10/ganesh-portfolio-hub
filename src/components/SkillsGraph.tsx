import { useEffect, useState } from "react";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  useNodesState,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ListFilter } from "lucide-react";
import { areaLayout, networkLayout, neighbours, skillEdges, skillGroups, skills } from "@/data/skills";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SkillNode, type SkillNodeType } from "./SkillNode";

const nodeTypes = { skill: SkillNode };

const colorOf = (group: string) => skillGroups.find((g) => g.id === group)!.color;
const groupOf = new Map(skills.map((s) => [s.id, s.group]));

// extra room so the top-left control pill doesn't cover boxes
const fitPadding = 0.15;

// Mouse/trackpad devices can hover; touch devices (phones, iPads) can't. Checked by capability, not screen width.
const canHover = window.matchMedia("(hover: hover)").matches;

const layouts = { network: networkLayout, group: areaLayout };

const initialNodes: SkillNodeType[] = skills.map((s) => ({
  id: s.id,
  type: "skill",
  position: networkLayout[s.id],
  data: s,
}));

export const SkillsGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState(skillGroups.map((g) => g.id)); // visible groups
  const [layout, setLayout] = useState<keyof typeof layouts>("network");
  const [moving, setMoving] = useState(false); // boxes slide only while switching, so dragging stays snappy
  const [rf, setRf] = useState<ReactFlowInstance<SkillNodeType>>();
  const [selected, setSelected] = useState<string | null>(null); // clicked/tapped box, any device
  const focus = selected ?? hovered; // a click pins the highlight and wins over hover
  const lit = focus ? neighbours.get(focus)! : null;

  // zoom to whatever is visible, after a filter or layout change; fitView skips hidden nodes
  useEffect(() => {
    rf?.fitView({ duration: 400, padding: fitPadding });
  }, [active, layout, rf]);

  const switchLayout = (next: keyof typeof layouts) => {
    setMoving(true);
    setLayout(next);
    setNodes((ns) => ns.map((n) => ({ ...n, position: layouts[next][n.id] })));
    setTimeout(() => setMoving(false), 500);
  };

  const styledNodes = nodes.map((n) => {
    const dimmed = !!lit && n.id !== focus && !lit.has(n.id);
    return {
      ...n,
      hidden: !active.includes(n.data.group),
      className: `transition-opacity duration-200 ${dimmed ? "opacity-20" : ""}`,
      style:
        n.id === focus
          ? { borderRadius: 12, boxShadow: `0 0 18px ${colorOf(n.data.group)}` }
          : undefined,
    };
  });

  // Edges never move, so no state: rebuild from skillEdges each render.
  const edges: Edge[] = skillEdges.map((e) => {
    const focused = !!focus && (e.from === focus || e.to === focus);
    return {
      id: `${e.from}-${e.to}`,
      source: e.from,
      target: e.to,
      hidden: !active.includes(groupOf.get(e.from)!) || !active.includes(groupOf.get(e.to)!),
      animated: focused,
      style: focused
        ? { stroke: "hsl(var(--primary))", strokeWidth: 2 }
        : { opacity: focus ? 0.2 : 1 },
    };
  });

  return (
    <section className="container-custom h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] flex flex-col pt-4 pb-4">
      {/* container-custom = navbar width, so the graph lines up with the logo and theme toggle */}
      <div className="flex-1 min-h-0 rounded-2xl border border-border bg-card/30 overflow-hidden">
        <ReactFlow
          nodes={styledNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          nodesConnectable={false}
          onNodeMouseEnter={(_, n) => canHover && setHovered(n.id)} // touch fires a fake hover on tap; ignore it
          onNodeClick={(_, n) => setSelected((s) => (s === n.id ? null : n.id))} // click again to clear
          onPaneClick={() => setSelected(null)}
          onNodeMouseLeave={() => setHovered(null)}
          onInit={setRf}
          fitView
          fitViewOptions={{ padding: fitPadding }}
          minZoom={0.1} // default 0.5 is too far in for the whole graph to fit a phone
          nodesDraggable={canHover} // on touch, a finger on a box should pan, not drag it
          className={moving ? "[&_.react-flow__node]:transition-transform [&_.react-flow__node]:duration-500" : ""}
        >
          <Panel
            position="top-left"
            className="flex items-center gap-0.5 max-w-[calc(100%-30px)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-border bg-card/80 backdrop-blur p-1"
          >
            {/* legend that doubles as the group filter: an "off" group fades */}
            <span className="shrink-0 flex items-center gap-1 pl-1.5 pr-0.5 text-xs text-muted-foreground">
              <ListFilter className="w-3 h-3" />
              <span className="hidden md:inline">Filter</span>
            </span>
            <ToggleGroup
              type="multiple"
              value={active}
              // ignore the click that would turn the last group off
              onValueChange={(v) => v.length && setActive(v)}
              className="shrink-0 gap-0"
            >
              {skillGroups.map((g) => (
                <ToggleGroupItem
                  key={g.id}
                  value={g.id}
                  title={g.name}
                  className="h-6 px-2 gap-1.5 text-xs hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-foreground data-[state=off]:opacity-40"
                >
                  <i className="w-2 h-2 rounded-[2px]" style={{ background: g.color }} />
                  {g.short}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <span className="shrink-0 w-px h-4 bg-border mx-1" />

            {/* segmented switch: the active option gets a teal tint */}
            <ToggleGroup
              type="single"
              value={layout}
              // single mode sends "" when the pressed item is clicked again; ignore that
              onValueChange={(v) => v && switchLayout(v as keyof typeof layouts)}
              className="shrink-0 gap-0"
            >
              <ToggleGroupItem
                value="network"
                className="h-6 px-2 text-xs hover:bg-transparent hover:text-foreground text-muted-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary"
              >
                Network
              </ToggleGroupItem>
              <ToggleGroupItem
                value="group"
                className="h-6 px-2 text-xs hover:bg-transparent hover:text-foreground text-muted-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary"
              >
                By area
              </ToggleGroupItem>
            </ToggleGroup>
          </Panel>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </section>
  );
};
