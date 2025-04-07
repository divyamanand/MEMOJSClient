import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const FormTrigger = () => {
  return (
    <Button
      variant="default"
      className="flex items-center gap-2 px-4 py-2 rounded-md"
    >
      <PlusCircle size={20} />
      <span className="text-sm font-medium">Add Question</span>
    </Button>
  )
}

export default FormTrigger
