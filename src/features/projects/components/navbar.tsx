"use client";
import React, { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { useProject, useRenameProject } from "../hooks/use-projects";
import { CloudCheck, LoaderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
type Props = {
  projectId: Id<"projects">;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = ({ projectId }: Props) => {
  const project = useProject(projectId);
  const renameProject = useRenameProject(projectId);
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartRename = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(false);
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;
    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-bottom border-b">
      <div className="flex items-center ">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="flex items-center gap-1.5 group/logo"
                asChild
              >
                <Button
                  variant={"ghost"}
                  className="w-fit! p-1.5! h-7!"
                  asChild
                >
                  <Link href={"/"}>
                    <Image
                      src={"/logo.svg"}
                      width={20}
                      height={20}
                      alt="Logo"
                    />
                    <span className={cn("text-sm font-medium", font)}>
                      Polaris
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0 mr-1" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={() => {
                    handleSubmit();
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                  }}
                  className="text-sm bg-transparent text-foreground outline-none focus:ring-ring font-medium max-w-40 truncate"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer hover:text-primary"
                >
                  {project?.name || "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <LoaderIcon className="size-4 text-muted-foreground animate-spin " />
              </TooltipTrigger>
              <TooltipContent>Importing...</TooltipContent>
            </Tooltip>
          </>
        ) : (
          project?.updatedAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudCheck className="size-4 text-muted-foreground ml-2 " />
              </TooltipTrigger>
              <TooltipContent>
                Saved {formatDistanceToNow(project.updatedAt)}
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
