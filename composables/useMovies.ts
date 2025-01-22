import { ref, onMounted, watch } from 'vue'

export const useMovies = (
  searchQueryParam: Ref<string>,
  pageParam: Ref<number>,
  filter: Ref<any>
) => {
  const movies = ref<any[]>([])

  const total = ref(0)

  async function fetchMovies() {
    const queryParams = {
      query: searchQueryParam.value,
      page: pageParam.value,
      language: 'pt-BR',
      sort_by: filter.value?.sort_by || '',
      primary_release_date_gte: filter.value?.primary_release_date_gte || '',
      vote_average_gte: filter.value?.vote_average_gte || '',
      vote_count_gte: filter.value?.vote_count_gte || '',
      with_genres: filter.value?.with_genres || '',
    }

    try {
      const { data }: any = await useAsyncData('getMovies', () =>
        $fetch('/api/getMovies', {
          params: {
            ...queryParams,
          },
        })
      )

      movies.value = data.value?.results || []
      total.value = data.value?.total_pages || 0
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  }

  // const prevPage = () => {
  //   if (pageParam.value > 1) {
  //     // pageParam.value--
  //     fetchMovies()
  //   }
  // }
  //
  // const nextPage = () => {
  //   if (pageParam.value < total.value) {
  //     // pageParam.value++
  //     fetchMovies()
  //   }
  // }

  watch(searchQueryParam, () => {
    // pageParam.value = 1
    fetchMovies()
  })

  watchEffect(async () => {
    await fetchMovies()
  })

  return {
    movies,
    searchQueryParam,
    pageParam,
    total,
    fetchMovies,
  }
}
