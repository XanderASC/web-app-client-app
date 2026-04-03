export interface Movie {
  averageReview: number;
  genre: string;
  id: number;
  posterUrl: string;
  rating: string;
  releaseDate: string;
  reviews: number;
  runtime: number;
  synopsis: string;
  title: string;
}

export interface Movies extends Movie {
  count: number;
}

export interface Review {
  id: number,
  rating: number,
  reviewText: string,
  createdBy: string
}