import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import ListRevisions from '@/queries/ListRevisions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FinalRevisionCards() {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ['revisions'] })
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <Card className="h-[86vh]">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Revisions</CardTitle>
          <CardDescription>Latest attempts and history</CardDescription>
        </div>
        {refreshing ? (
          <Button className="bg-primary text-accent">
            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            Refreshing...
          </Button>
        ) : (
          <button onClick={handleRefresh}>
            <RefreshCcw className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition hover:rotate-180 duration-500" />
          </button>
        )}
      </CardHeader>
      <CardContent className="h-[calc(86vh-88px)] overflow-y-auto custom-scroll">
        <ListRevisions />
      </CardContent>
    </Card>
  )
}