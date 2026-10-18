import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { skillGroups, type Skill } from "@/data/skills";

export type SkillNodeType = Node<Skill, "skill">;

const colorOf = (group: string) => skillGroups.find((g) => g.id === group)!.color;

export const SkillNode = ({ data }: NodeProps<SkillNodeType>) => {
  const color = colorOf(data.group);
  return (
    <div
      className="min-w-[170px] w-fit whitespace-nowrap h-[46px] flex items-center gap-2.5 px-2.5 rounded-xl border bg-card text-card-foreground"
      style={{ borderColor: color }}
    >
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <span
        className="w-7 h-7 shrink-0 grid place-items-center rounded-md text-[11px] font-bold"
        style={{ color, background: `${color}22` }}
      >
        {data.abbr}
      </span>
      <b className="text-[13px] font-semibold">{data.label}</b>
      <Handle type="source" position={Position.Right} className="!opacity-0" />
    </div>
  );
};
