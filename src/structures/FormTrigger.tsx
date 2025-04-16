import { PlusCircle } from 'lucide-react'

const FormTrigger = () => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-background font-extralight"
    >
      <PlusCircle size={20} />
      <span className="text-sm font-medium">Add Question</span>
    </div>
  )
}

export default FormTrigger
