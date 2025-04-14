import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Revision from "../structures/Revision";

const ListRevisions = () => {
  const queryClient = useQueryClient();
  const URL: string = import.meta.env.VITE_API_URL;

  const mutation = useMutation<
  number[], // Data type returned from mutationFn (response)
  Error,    // Error type
  number[], // Variables passed to mutationFn (question IDs)
  { previousData: any } // Context passed from onMutate to onError/onSettled
>({
  mutationFn: (questionIDs: number[]) => {
    return axios.post(`${URL}/mark-revisions`, { ids: questionIDs });
  },
  onMutate: async (questionIDs) => {
    await queryClient.cancelQueries({ queryKey: ["revisions"] });

    const previousData = queryClient.getQueryData<any>(["revisions"]);

    queryClient.setQueryData(["revisions"], (old: any) => {
      return {
        ...old,
        response: old.response.map((q: any) =>
          questionIDs.includes(q.revision_id)
            ? { ...q, completed: true }
            : q
        ),
      };
    });

    return { previousData };
  },
  onError: (_err, _variables, context) => {
    queryClient.setQueryData(["revisions"], context?.previousData);
  },
  onSettled: () => {
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
