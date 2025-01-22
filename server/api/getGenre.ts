import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const language = getQuery(event).language || 'pt-br'

  try {
    const apiKey = '92e757e77a46d7377befb4ae5f4f45d5'
    const token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU3NTdlNzdhNDZkNzM3N2JlZmI0YWU1ZjRmNDVkNSIsIm5iZiI6MTczNzI5NDk0Mi40NTEsInN1YiI6IjY3OGQwNDVlZDA5NGVhN2FmMTQzM2I2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LBysW--Vs92fJ8b85Himtuf7WE1ltAfmc4KTNgemDw'

    const endpoint = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`

    return await $fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
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
