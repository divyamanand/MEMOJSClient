import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Revision from "../structures/Revision";

const ListRevisions = () => {
  const queryClient = useQueryClient();
  const URL: string = import.meta.env.VITE_API_URL
  const mutation = useMutation<number[], Error, number[]>({
    mutationFn: (markRevisions: number[]) => {
      return axios.post(`${URL}/mark-revisions`, { ids: markRevisions });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revisions"] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["revisions"],
    queryFn: () =>
      fetch(`${URL}/list-revisions`)
        .then((res) => res.json())
        .catch((err) => console.log(err)),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">{data?.response?.length} Questions</h3>

      {/* Pinterest-style masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {data.response.map((ques: {
          revision_id: number;
          question: string;
          tags: string;
          last_revised: string;
          completed: boolean;
          link: string;
        }) => (
          <div key={ques.revision_id} className="break-inside-avoid">
            <Revision
              isChecked={ques.completed}
              revisionId={ques.revision_id}
              handleChecks={() => mutation.mutate([ques.revision_id])}
              questionName={ques.question}
              questionTags={ques.tags}
              lastRevision={ques.last_revised || "None"}
              questionLink={ques.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRevisions;
