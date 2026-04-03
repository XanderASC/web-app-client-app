import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import type { Movie } from "../types";
import Loading from "../components/Loading";
import { useParams } from "react-router";
import Reviews from "../components/Reviews";

export default function Movie() {
  const { id } = useParams();
  const { data, isPending, error } = useQuery({
      queryKey: [`Movie${id}`],
      queryFn: (): Promise<Movie> => fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`).then(r => r.json())
  });

  if (isPending) {
    return <Loading />
  }

  if (error) {
    throw 'Error loading movie.';
  }

  const hours = Math.floor(data.runtime / 60);
  const minutes = data.runtime % 60;
  const formattedReleaseDate = new Date(data.releaseDate).toLocaleDateString();

  return <Container className="py-8">
    <div className="flex flex-col-reverse md:flex-row gap-8">
      <div className="flex flex-col gap-8 md:max-h-[max(calc(100vh-156px),400px)] min-h-[600px] overflow-hidden">
        <div>
          <h1 className="text-4xl">{data.title}<span className="text-foreground-muted"> – {hours}h&nbsp;{minutes}m</span></h1>
          <div className="flex gap-4 text-foreground-muted text-lg">
            <p>{data.genre}</p>–
            <p>{data.rating}</p>–
            <p>{formattedReleaseDate}</p>
          </div>
        </div>
        <section className="p-4 bg-background-muted space-y-4">
          <div className="flex gap-4 text-foreground-muted text-lg">
            <p>&#9734; {data.averageReview.toFixed(1)} / 5</p>–
            <p>{data.reviews} reviews</p>
          </div>
          <div>
            {data.synopsis}
          </div>
        </section>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <h2 className="text-3xl">Reviews</h2>
          <Reviews id={data.id} />
        </div>
      </div>
      <img src={data.posterUrl} className="md:h-[calc(100vh-156px)] md:max-w-[40vw] object-cover" />
    </div>
  </Container>
}