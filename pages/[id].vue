<script setup lang="ts">
const movies = ref<any[]>([])
const route = useRoute()
const fullSlug = route.fullPath as string
const newUrl = fullSlug.replace(/^\/|\/$/g, '')

async function fetchMoviesById() {
  const queryParams = {
    id: newUrl,
    language: 'pt-BR',
  }

  try {
    const { data }: any = await useAsyncData('getMovieByID', () =>
      $fetch('/api/getMovieByID', {
        params: {
          ...queryParams,
        },
      })
    )

    movies.value = data.value || []
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
}

fetchMoviesById()
</script>
<template>
  <div class="movie-details">
    <main class="content">
      <CardsMovie :movie="movies" />
      <section class="trailer">
        <h3>Trailer</h3>
        <iframe
          v-for="(video, index) in movies?.videos?.results.slice(0, 1)"
          :key="index"
          width="1238"
          height="647"
          :src="`https://www.youtube.com/embed/${video.key}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>
    </main>
  </div>
</template>

<!--<style scoped lang="scss">-->

<!--</style>-->
