import type { Genre } from '~/type/Genre'

export const useGenre = () => {
  const genre = ref<any[]>([])

  async function fetchGenre() {
    try {
      const { data }: any = await useAsyncData('getGenre', () =>
        $fetch('/api/getGenre', {
          params: {
            language: 'pt-br',
          },
        })
      )

      genre.value = data.value.genres
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  }

  watchEffect(async () => {
    await fetchGenre()
  })

  return {
    genre,
  }
}
