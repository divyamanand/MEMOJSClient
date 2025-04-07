import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ReactElement, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

export interface DialogProp {
  trigger: ReactElement
}

const QuestionForm: React.FC<DialogProp> = ({ trigger }) => {
  const [quest, setQuest] = useState({
    question: "",
    difficulty: "",
    tags: "",
    link: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate([quest])
    setQuest({ question: "", difficulty: "", tags: "", link: "" })
  }

  const mutation = useMutation<object[], Error, object[]>({
    mutationFn: (quests: object[]) => {
      return axios.post("http://localhost:8000/add-questions", {
        questions: quests,
      })
    },
  })

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add a New Question
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Fill out the form below to submit your question.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Question */}
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium text-muted-foreground">
              Question
            </label>
            <Input
              id="question"
              placeholder="Enter your question"
              value={quest.question}
              onChange={(e) =>
                setQuest({ ...quest, question: e.target.value })
              }
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="space-y-2">
            <label htmlFor="difficulty" className="text-sm font-medium text-muted-foreground">
              Difficulty
            </label>
            <Select
              value={quest.difficulty}
              onValueChange={(value) =>
                setQuest({ ...quest, difficulty: value })
              }
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">easy</SelectItem>
                <SelectItem value="Medium">medium</SelectItem>
                <SelectItem value="Hard">hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium text-muted-foreground">
              Tags
            </label>
            <Input
              id="tags"
              placeholder="Comma-separated tags (e.g. array, dp)"
              value={quest.tags}
              onChange={(e) =>
                setQuest({ ...quest, tags: e.target.value })
              }
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium text-muted-foreground">
              Source / Link
            </label>
            <Input
              id="link"
              placeholder="https://example.com/question"
              value={quest.link}
              onChange={(e) =>
                setQuest({ ...quest, link: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" className="px-6">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionForm
