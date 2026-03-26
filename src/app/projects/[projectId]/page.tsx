import ProjectIdView from '@/features/projects/components/project-id-view'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'

type Props = {
  params: Promise<{
    projectId: Id<"projects">
  }>
}

const ProjectIdPage = async ({ params }: Props) => {
  const {projectId} = await params

  return (
    <ProjectIdView projectId={projectId}  />
  )
}

export default ProjectIdPage