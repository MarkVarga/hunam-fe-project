import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-employee')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create-employee"!</div>
}
