import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import type { Movies } from "../types";
import { useNavigate, useOutletContext } from "react-router";
import Loading from "../components/Loading";


export default function Main() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { search } = useOutletContext<{ search: string }>();

  const { data, isPending, error } = useQuery({
      queryKey: ['Main'],
      queryFn: (): Promise<Movies[]> => fetch(`${import.meta.env.VITE_API_URL}/movies?page=${page}&search=${search}`).then(r => r.json())
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['Main'] })
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (isPending) {
    return <Loading />
  }

  if (error || page * 5 - 5 >= (data[0].count || 1)) {
    throw 'Error loading movies.';
  }

  const emptySlotsCount = 5 - data.length;

  const emptyDivs = new Array<ReactNode>(emptySlotsCount).fill((
    <div className="w-[100%] duration-500 h-full bg-cover bg-center flex flex-col"></div>
  ), 0, emptySlotsCount);

  return <>
    <div className="flex flex-1">
      <h1 className="sr-only">FlickCritic Home Page</h1>
      <button
        className="fixed top-[calc(50vh-42.5px)] py-2 px-6 bg-background-muted rounded-full left-5 text-6xl text-primary border border-primary border-3 cursor-pointer hover:bg-background active:top-[calc(50vh-40px)]"
        onClick={() => page <= 1 ? undefined : setPage(page - 1)}
        style={page <= 1 ? {
          opacity: "50%",
          cursor: "not-allowed"
        }: {}}
      >
        <span className="ml-[-8px]">&#10094;</span>
      </button>
      <button
        className="fixed top-[calc(50vh-42.5px)] py-2 px-6 bg-background-muted rounded-full right-5 text-6xl text-primary border border-primary border-3 cursor-pointer hover:bg-background active:top-[calc(50vh-40px)]"
        onClick={() => page * 5 >= data[0].count ? undefined : setPage(page + 1)}
        style={page * 5 >= data[0].count ? {
          opacity: "50%",
          cursor: "not-allowed"
        }: {}}
      >
        <span className="mr-[-8px]">&#10095;</span>
      </button>
      <div className="flex flex-1 flex-col lg:flex-row">
        {data[0].id !== 0 ? data.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[100%] duration-500 h-full bg-cover bg-center flex flex-col cursor-pointer min-h-[33vh] hover:min-h-[66vh] lg:hover:h-full lg:hover:w-[150%]"
              style={{backgroundImage: `url(${movie.posterUrl})`}}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <div className="flex-1 bg-linear-to-t from-[#000d] to-[#0000] flex flex-col justify-end">
                <h2 className="text-4xl text-center mb-10 px-2">{movie.title}</h2>
              </div>
            </div>
          );
        }) : <p className="absolute left-0 top-0 right-0 bottom-0 justify-center flex items-center text-4xl text-foreground-muted pointer-events-none">No results.</p>}
        {emptyDivs}
      </div>
    </div>
    <p className="text-center text-lg py-2 bg-background-muted">Page {page} of {Math.ceil(data[0].count / 5 || 1)}</p>
  </>
}