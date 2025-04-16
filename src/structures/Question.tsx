import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, Pencil, Trash2 } from "lucide-react";
import React from "react";

export interface Props {
  questionName: string;
  questionTags: string;
  lastRevision: string;
  questionLink: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Question: React.FC<Props> = ({
  questionName = "Your Question Name",
  questionTags = "GFG",
  lastRevision = "04 Apr 2025",
  questionLink = "",
  onDelete,
  onEdit,
}) => {
  return (
    <Card
      className={`
        w-full backdrop-blur-sm border border-border bg-background/70
        rounded-2xl p-4 transition-all
        hover:shadow-lg hover:border-primary/40 hover:scale-[1.01]
      `}
    >
      <CardHeader className="flex flex-row justify-between items-start p-0">
        {/* Left Side: Texts */}
        <div className="space-y-2">
          <CardTitle className="text-base font-semibold leading-snug tracking-tight text-foreground">
            {questionName}
          </CardTitle>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full bg-muted/60 px-2 py-[2px]">
              {questionTags}
            </Badge>

            {questionLink && (
              <a
                href={questionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkIcon size={16} className="ml-1 inline-block align-middle" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Icons */}
        <div className="flex flex-col space-y-1 items-end mt-1">
          <button
            onClick={onEdit}
            className="p-1 rounded-md transition-colors text-muted-foreground hover:text-primary"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-md transition-colors text-muted-foreground hover:text-red-500"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Question;
