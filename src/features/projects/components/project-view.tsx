"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub } from "react-icons/fa";
import ProjectList from "./project-list";
import { useCreateProject } from "../hooks/use-projects";
import {
  adjectives,
  colors,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import ProjectCommandDialog from "./projects-command-dialog";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ProjectView = () => {
  const createProjects = useCreateProject();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        console.log("key:", e.key, "ctrl:", e.ctrlKey, "shift:", e.shiftKey);
        if (e.shiftKey && e.key === "K") {
          e.preventDefault();
          setCommandDialogOpen(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Fragment>
      <ProjectCommandDialog
        onOpenChange={setCommandDialogOpen}
        open={commandDialogOpen}
      />
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full item-center">
            <div className="flex item-center gap-2 w-full group/logo: ">
              <img
                src="/vercel.svg"
                alt="polaris"
                className="size-[32px] md:size-[46px]"
              />
              <h1
                className={cn(
                  "text-4xl md:text-5xl font-semibold",
                  font.className,
                )}
              >
                Polaris
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full ">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  const projectNames = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                  });
                  createProjects({
                    name: projectNames,
                  });
                }}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none "
              >
                <div className="flex items-center justify-between w-full ">
                  <SparkleIcon className="size-4 " />
                  <Kbd className="bg-accent border">Shift + P</Kbd>
                </div>
                <div className="">
                  <span className="text-sm">New</span>
                </div>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {}}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none "
              >
                <div className="flex items-center justify-between w-full ">
                  <FaGithub className="size-4 " />
                  <Kbd className="bg-accent border">Import</Kbd>
                </div>
                <div className="">
                  <span className="text-sm">New</span>
                </div>
              </Button>
            </div>
            <ProjectList
              onViewAll={() => {
                setCommandDialogOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectView;
