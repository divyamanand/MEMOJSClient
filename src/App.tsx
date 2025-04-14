import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"
import { Button } from './components/ui/button'
import { Flame } from "lucide-react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"

import FinalRevisionCards from "@/structures/cards/FinalRevisoinCards"
import FinalQuestionCards from "@/structures/cards/FinalQuestionCards"

function App() {
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
        <ResizablePanelGroup direction="horizontal" className="gap-4">
          <ResizablePanel defaultSize={50} minSize={30}>
            <FinalRevisionCards />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <FinalQuestionCards />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  )
}

export default App
