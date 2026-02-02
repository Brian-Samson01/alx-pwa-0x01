# alx-project-0x14

This project focuses on understanding and integrating the MoviesDatabase API by reviewing its documentation, learning the request and response structure, handling authentication, managing errors, and applying best practices for usage. This step is foundational for building the CineSeek movie discovery application.

---

## API Overview

The MoviesDatabase API provides access to a large collection of movie data including titles, release dates, genres, ratings, posters, and descriptions. It allows developers to browse movies, filter by year and genre, perform searches, and retrieve detailed information about individual movies. The API supports pagination, making it suitable for large datasets, and is designed to power modern movie discovery applications.

---

## API Version

The current stable API version used is:

**Version: v1**

---

## Available Endpoints

Below are the main endpoints used in the MoviesDatabase API:

| Endpoint               | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **GET /titles**        | Fetches a list of movies with optional filters such as year, genre, and pagination. |
| **GET /titles/{id}**   | Retrieves full details for a specific movie using its unique ID.                    |
| **GET /titles/search** | Searches for movies based on title keywords.                                        |
| **GET /genres**        | Returns a list of all available movie genres.                                       |

---

## Request and Response Format

### Request Format

Requests are made using standard HTTP methods, primarily **GET**, with query parameters for filtering and pagination.

**Example Request:**

```http
GET https://api.moviesdatabase.org/titles?year=2022&genre=Action&page=1
```

### Response Format

Responses are returned in **JSON format**. A typical response contains metadata and an array of movie objects.

**Example Response:**

```json
{
  "page": 1,
  "total_pages": 100,
  "results": [
    {
      "id": "tt1234567",
      "title": "Example Movie",
      "year": 2022,
      "genre": ["Action", "Adventure"],
      "poster": "/example.jpg",
      "rating": 7.9
    }
  ]
}
```

Each movie object typically includes:

* `id`
* `title`
* `year`
* `genre`
* `poster`
* `rating`
* `description` (for detailed views)

---

## Authentication

The MoviesDatabase API uses **API Key Authentication**.

### How Authentication Works:

* An API key is required for every request.
* The API key is passed using request headers.

**Example Header:**

```http
Authorization: Bearer YOUR_API_KEY
```

### Security Best Practice:

* The API key must be stored in an environment variable using `.env.local`.
* All external API calls should be handled inside protected **Next.js API routes** to prevent exposing the API key on the client.

---

## Error Handling

The API may return standard HTTP error responses such as:

| Status Code | Meaning                                 |
| ----------- | --------------------------------------- |
| **400**     | Bad Request                             |
| **401**     | Unauthorized (Invalid API Key)          |
| **404**     | Resource Not Found                      |
| **429**     | Too Many Requests (Rate Limit Exceeded) |
| **500**     | Internal Server Error                   |

### Error Handling Strategy:

* Use `try/catch` blocks in API routes.
* Check response status before processing data.
* Display friendly error messages to users.
* Implement fallback UI using a Loading or Error component.
* Use TypeScript type guards to verify API data integrity.

---

## Usage Limits and Best Practices

### Usage Limits:

* The API enforces rate limits to prevent abuse.
* Excessive requests within a short time may result in a **429 error**.

### Best Practices:

* Use **pagination** instead of fetching large datasets at once.
* Cache results on the client when appropriate.
* Always handle loading and error states.
* Never expose API keys on the frontend.
* Use TypeScript interfaces for all API responses.
* Use server-side API routes for secure requests.
* Optimize images using the Next.js Image component.
* Follow proper attribution guidelines where required.

---

