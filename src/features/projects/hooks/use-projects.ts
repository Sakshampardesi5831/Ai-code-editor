import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Doc } from "../../../../convex/_generated/dataModel";
export const useProjects = () => {
  const projects = useQuery(api.projects.get);
  return projects;
};

export const useProjectsPartial = (limit: number) => {
  const projects = useQuery(api.projects.getPartial, {
    limit,
  });
  return projects;
};

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localstore, args) => {
      const existingProjects = localstore.getQuery(api.projects.get);
      if (existingProjects !== undefined) {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        const newProject: Doc<"projects"> = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: args.name,
          ownerId: "anonymous",
          updatedAt: now,
        };
        localstore.setQuery(api.projects.get, {}, [
          ...existingProjects,
          newProject,
        ]);
      }
    },
  );
};
