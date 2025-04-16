import { Badge } from "@/components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Link as LinkIcon, MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <Card
      className={`
        w-full backdrop-blur-sm border border-border bg-background/70
        rounded-2xl p-4 transition-all gap-0
        hover:shadow-lg hover:border-primary/40 hover:scale-[1.01]
        ${isChecked
          ? "ring-1 ring-green-400 shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
          : "shadow-sm"}
      `}
    >
      <CardHeader className="flex flex-row justify-between items-start p-0 m-0">
        <div className="flex-1 overflow-hidden">
          <CardTitle className="text-base font-semibold leading-snug tracking-tight text-foreground text-wrap overflow-ellipsis">
            {questionName}
          </CardTitle>
        </div>
        <Checkbox
          checked={!!isChecked}
          id={revisionId.toString()}
          onCheckedChange={handleChecks}
          className="ml-2 mt-1 shrink-0 scale-110 hover:scale-115 transition-transform hover:cursor-pointer"
        />
      </CardHeader>

      <CardFooter className="flex items-center justify-between px-0 py-0 m-0 mt-2 space-x-2 overflow-hidden">
        <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap overflow-hidden">
          <Badge
            variant="secondary"
            className="rounded-full px-2 py-[2px] shrink-0 text-[11px] font-medium"
          >
            {lastRevision}
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {questionLink && (
            <a
              href={questionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Open Question"
            >
              <LinkIcon size={16} className="inline-block align-middle" />
            </a>
          )}
          <button
            className="p-[6px] rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="More options"
            onClick={openDialog}
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </CardFooter>

      {/* Dialog styled as a professional card */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-6 space-y-4">
          <DialogTitle className="text-xl font-semibold leading-snug">
            {questionName}
          </DialogTitle>

          <DialogDescription>
            {/* Description is intentionally left empty */}
          </DialogDescription>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="rounded-full bg-muted/40 px-2 py-[2px] text-[11px] font-medium">
              Tag: {questionTags}
            </Badge>
            <Badge variant="secondary" className="rounded-full px-2 py-[2px] text-[11px] font-medium">
              Last Revised: {lastRevision}
            </Badge>
            {questionLink && (
              <a
                href={questionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors ml-auto"
                title="Open Question Link"
              >
                <LinkIcon size={18} />
              </a>
            )}
          </div>

          <DialogFooter>
            <button
              onClick={closeDialog}
              className="bg-primary text-white px-4 py-2 rounded-lg mt-2 ml-auto"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Revision;
