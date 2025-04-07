import { Badge } from "@/components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { Link as LinkIcon } from "lucide-react";

export interface Props {
  handleChecks: () => void;
  isChecked: boolean;
  revisionId: number;
  questionName: string;
  questionTags: string;
  lastRevision: string;
  questionLink: string;
}

const Revision: React.FC<Props> = ({
  revisionId = 1,
  isChecked = false,
  handleChecks,
  questionName = "Your Question Name",
  questionTags = "GFG",
  lastRevision = "04 Apr 2025",
  questionLink = "",
}) => {
  return (
    <Card
  className={`
    w-full backdrop-blur-sm border border-border bg-background/70
    rounded-2xl p-4 transition-all
    hover:shadow-lg hover:border-primary/40 hover:scale-[1.01]
    ${isChecked 
      ? "ring-1 ring-green-400 shadow-[0_4px_12px_rgba(34,197,94,0.3)]" 
      : "shadow-sm"}
  `}
>

      <CardHeader className="flex flex-row justify-between items-start p-0">
        <div className="space-y-2">
          <CardTitle className="text-base font-semibold leading-snug tracking-tight text-foreground">
            {questionName}
          </CardTitle>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full bg-muted/60 px-2 py-[2px]">
              {questionTags}
            </Badge>
            <Badge variant="secondary" className="rounded-full px-2 py-[2px]">
              {lastRevision}
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

        <Checkbox
          checked={!!isChecked}
          id={revisionId.toString()}
          onCheckedChange={handleChecks}
          className="mt-1 scale-110 hover:scale-115 transition-transform hover:cursor-pointer"
        />
      </CardHeader>
    </Card>
  );
};

export default Revision;
