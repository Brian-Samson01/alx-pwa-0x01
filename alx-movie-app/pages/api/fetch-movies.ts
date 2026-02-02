import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed in here`);
  }

  const { year, page = 1, genre } = request.body || {};
  const date = new Date();

  const apiKey = process.env.MOVIE_API_KEY;
  if (!apiKey) {
    console.error("MOVIE_API_KEY is not set");
    return response
      .status(500)
      .json({ error: "MOVIE_API_KEY is not set. Add it to .env.local and restart the dev server." });
  }

  const url = `https://moviesdatabase.p.rapidapi.com/titles?year=${
    year || date.getFullYear()
  }&sort=year.decr&limit=12&page=${encodeURIComponent(page)}${genre ? `&genre=${encodeURIComponent(genre)}` : ""}`;

  try {
    const resp = await fetch(url, {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    });

    if (!resp.ok) {
      const bodyText = await resp.text().catch(() => "(no body)");
      console.error("Failed fetching movies:", resp.status, resp.statusText, bodyText);
      return response.status(resp.status || 500).json({
        error: "Failed to fetch movies",
        status: resp.status,
        statusText: resp.statusText,
        body: bodyText,
      });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results || [];

    return response.status(200).json({ movies });
  } catch (err) {
    console.error("Unexpected error fetching movies:", err);
    return response.status(500).json({ error: "Unexpected error fetching movies" });
  }
};