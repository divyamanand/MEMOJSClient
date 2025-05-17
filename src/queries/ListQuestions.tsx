import Question from "@/structures/Question"
import { useQuery } from "@tanstack/react-query"

const ListQuestions = () => {

  const URL: string = import.meta.env.VITE_API_URL

  const { isPending, error, data } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      fetch(`${URL}/list-questions`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">{data?.response?.length} Questions</h3>

      {/* Masonry grid layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {data.response.map((ques: {
          id: number;
          question: string;
          tags: string;
          link: string;
        }) => (
          <div key={ques.id} className="break-inside-avoid">
            <Question
              questionName={ques.question}
              questionTags={ques.tags}
              questionLink={ques.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListQuestions;
