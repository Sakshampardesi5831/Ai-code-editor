import React from "react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, Command, GlobeIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";

interface ProjectsCommandsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectCommandDialog = ({
  open,
  onOpenChange,
}: ProjectsCommandsDialogProps) => {
  const router = useRouter();
  const projects = useProjects();

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };
  const formatTimeStamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const getProjectIcon = (project: Doc<"projects">) => {
    if (project.importStatus === "completed") {
      return <FaGithub className="size-4 text-muted-foreground" />;
    }
    if (project.importStatus === "failed") {
      return <AlertCircleIcon className="size-4 text-muted-foreground" />;
    }

    if (project.importStatus === "importing") {
      return (
        <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
      );
    }
    return <GlobeIcon className="size-4 text-muted-foreground" />;
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigate to your Projects"
    >
      <CommandInput placeholder="Search project..." />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name} - ${project._id}`}
              onSelect={() => handleSelect(project._id)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {getProjectIcon(project)}
                <span>{project.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTimeStamp(project.updatedAt)}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem onSelect={() => router.push("/projects/new")}>
            <span>Create New Project</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ProjectCommandDialog;
