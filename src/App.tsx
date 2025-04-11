import { ModeToggle } from './components/mode-toggle'
import ListRevisions from './queries/ListRevisions'
import { ThemeProvider } from "@/components/theme-provider"
import QuestionForm from './structures/QuestionForm'
import ListQuestions from './queries/ListQuestions'
import FormTrigger from "./structures/FormTrigger"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from './components/ui/button'
import { RefreshCcw, Flame } from "lucide-react"
import { useQueryClient } from '@tanstack/react-query'

// Import resizable from shadcn/ui
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

function App() {
  const queryClient = useQueryClient()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-6 overflow-hidden">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Question Manager</h1>
            <p className="text-muted-foreground text-sm">
              Add and manage coding questions with ease.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1 text-sm text-orange-500 font-medium">
              <Flame className="w-5 h-5" />
              <span>12</span>
            </div>
            <Button variant="outline">Login</Button>
            <ModeToggle />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Resizable Layout */}
        <ResizablePanelGroup direction="horizontal" className="h-[86vh] gap-4">
          {/* Revisions Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <Card className="h-full">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Revisions</CardTitle>
                  <CardDescription>Latest attempts and history</CardDescription>
                </div>
                <button onClick={() => queryClient.invalidateQueries({ queryKey: ["revisions"] })}>
                  <RefreshCcw className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition" />
                </button>
              </CardHeader>
              <CardContent className="overflow-y-auto custom-scroll h-full">
                <ListRevisions />
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Questions Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <Card className="h-full">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Questions</CardTitle>
                  <CardDescription>Submitted questions list</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => queryClient.invalidateQueries({ queryKey: ["questions"] })}>
                    <RefreshCcw className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition" />
                  </button>
                  <QuestionForm trigger={<FormTrigger />} />
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto custom-scroll h-full">
                <ListQuestions />
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  )
}

export default App
