import { ModeToggle } from './components/mode-toggle'
import ListRevisions from './queries/ListRevisions'
import { ThemeProvider } from "@/components/theme-provider"
import QuestionForm from './structures/QuestionForm'
import ListQuestions from './queries/ListQuestions'
import FormTrigger from "./structures/FormTrigger"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from './components/ui/button'
import { RefreshCcw } from "lucide-react"
import { Flame } from "lucide-react"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-6 overflow-hidden">
        
        {/* Top Bar */}
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
              <span>12</span> {/* You can make this dynamic later */}
            </div>
            <Button variant="outline">Login</Button>
            <ModeToggle />
          </div>
        </div>


        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revisions */}
          <Card className="h-[86vh]">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Revisions</CardTitle>
              <CardDescription>Latest attempts and history</CardDescription>
            </div>
            <RefreshCcw className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition" />
          </CardHeader>

            <CardContent className="overflow-y-auto custom-scroll h-full">
              <ListRevisions />
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="h-[86vh]">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Submitted questions list</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCcw className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition" />
              <QuestionForm trigger={<FormTrigger />} />
            </div>
          </CardHeader>

            <CardContent className="overflow-y-auto custom-scroll max-h-full">
              <ListQuestions />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
