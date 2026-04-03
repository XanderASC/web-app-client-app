import { useQuery } from "@tanstack/react-query";
import type { Review } from "../types";
import Loading from "./Loading";

export default function Reviews({ id }: { id: number }) {

  const { data, isPending, error } = useQuery({
      queryKey: [`Reviews${id}`],
      queryFn: (): Promise<Review[]> => fetch(`${import.meta.env.VITE_API_URL}/reviews?movieId=${id}`).then(r => r.json())
  });

  if (isPending) {
    return <Loading />
  }

  if (error) {
    throw 'Error loading reviews.';
  }

  return (
    <div className="flex-1 overflow-y-scroll space-y-4">
      {data.length === 0 ? 'No reviews found.' : data.map((review) => {
        return (
          <div className="bg-background-muted p-4 space-y-4">
            <div className="flex gap-4 text-foreground-muted">
              <p>{review.createdBy}</p>–
              <p>&#9734; {review.rating} / 5</p>
            </div>
            <p>{review.reviewText}</p>
          </div>
        );
      })}
    </div>
  );
}