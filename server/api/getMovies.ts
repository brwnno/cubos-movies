import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const queryParams = {
    query: getQuery(event).query as string,
    page: parseInt(getQuery(event).page as string) || 1,
    language: getQuery(event).language || 'pt-br',
    sort_by: getQuery(event).sort_by || '',
    include_adult: false,
    include_video: true,
    primary_release_date_gte: getQuery(event).primary_release_date_gte,
    'vote_average.gte': getQuery(event).vote_average_gte,
    'vote_count.gte': getQuery(event).vote_count_gte,
    with_genres: getQuery(event).with_genres,
    with_watch_providers: getQuery(event).with_watch_providers,
    watch_region: getQuery(event).watch_region,
  }

  const buildQueryString = (params: Record<string, any>) => {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  }

  try {
    const apiKey = '92e757e77a46d7377befb4ae5f4f45d5'
    const token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU3NTdlNzdhNDZkNzM3N2JlZmI0YWU1ZjRmNDVkNSIsIm5iZiI6MTczNzI5NDk0Mi40NTEsInN1YiI6IjY3OGQwNDVlZDA5NGVhN2FmMTQzM2I2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LBysW--Vs92fJ8b85Himtuf7WE1ltAfmc4KTNgemDw'

    const baseEndpoint = queryParams.query
      ? 'https://api.themoviedb.org/3/search/movie'
      : 'https://api.themoviedb.org/3/discover/movie'

    const queryString = buildQueryString(queryParams)
    const endpoint = `${baseEndpoint}?${queryString}`

    return await $fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token,
        accept: 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar filmes na API do TMDb.',
    })
  }
})
