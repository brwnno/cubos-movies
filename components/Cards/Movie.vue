<script setup lang="ts">
import type { Movie } from '~/type/Movie'
import { ShortDataFormat } from '~/utils/formatDate'
import { useBreakpoints } from '@vueuse/core'

const props = defineProps<{
  movie: Movie
}>()

const backgroundStyle = computed(() => ({
  backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.movie?.backdrop_path})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
})

const isMobile = breakpoints.smaller('md')

function toPercentage(value: number) {
  let percentage = Math.round(value * 1000)
  percentage = Math.round(percentage / 100)
  return `${percentage}`
}

function profit(revenue: number, budget: number) {
  return formatWithIntl(revenue - budget)
}

function formatWithIntl(value: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(value)
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursText = hours > 0 ? `${hours}h` : ''
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : ''

  return [hoursText, minutesText].filter(Boolean).join(' ')
}

function getLanguageName(code: string) {
  try {
    const language = new Intl.DisplayNames(['pt'], { type: 'language' })
    return language.of(code)
  } catch (error) {
    console.error('Erro ao obter o nome do idioma:', error)
    return null
  }
}
</script>
<template>
  <section class="movie-info" :style="!isMobile ? backgroundStyle : ''">
    <div class="overlay"></div>
    <figure class="card-image">
      <picture>
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
          :alt="movie.title"
          :title="movie.title"
          loading="lazy"
          sizes="
                  (min-width: 1400px) 262px,
                  (min-width: 1200px) 198px,
                  (min-width: 992px) 164px,
                  (min-width: 768px) 132px,
                  280px
                "
        />
      </picture>
    </figure>

    <div class="details">
      <div class="container">
        <div class="container-title">
          <h2>{{ movie?.title }}</h2>
          <p class="subtitle">
            Título original: {{ movie?.original_title }}<br />
          </p>
          <p class="tagline">{{ movie?.tagline }}</p>
        </div>

        <div class="rating-container">
          <div class="cardBox">
            <h5 class="title">Popularidade</h5>
            <p class="text">{{ movie?.popularity }}</p>
          </div>
          <div class="cardBox">
            <h5 class="title">Votos</h5>
            <p class="text">{{ movie?.vote_count }}</p>
          </div>

          <div class="circle">
            <svg class="progress" viewBox="0 0 36 36">
              <path
                class="bg"
                d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="progress-bar"
                :stroke-dasharray="toPercentage(movie?.vote_average) + ', 100'"
                d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span class="percentage">
              {{ toPercentage(movie?.vote_average) }}
              <small>%</small>
            </span>
          </div>
        </div>
      </div>

      <div class="details-grid">
        <div class="main-details">
          <div class="cardBox">
            <span class="synopsis">
              <h5 class="title">Sinopse</h5>
              <p class="text">{{ movie?.overview }}</p>
            </span>
          </div>
          <div class="container">
            <div class="cardBox">
              <h5 class="title">Generos</h5>
              <div class="genres">
                <span
                  v-for="(genre, index) in movie?.genres"
                  :key="index"
                  class="genre"
                  >{{ genre.name }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="additional-details">
          <div class="details-row-one">
            <div class="cardBox">
              <h5 class="title">Lançamento</h5>
              <p class="text">{{ ShortDataFormat(movie?.release_date) }}</p>
            </div>
            <div class="cardBox">
              <h5 class="title">Duração</h5>
              <p class="text">{{ formatDuration(movie?.runtime) }}</p>
            </div>
            <div class="cardBox">
              <h5 class="title">Situação</h5>
              <p class="text">{{ movie?.status }}</p>
            </div>
            <div class="cardBox">
              <h5 class="title">Idioma</h5>
              <p class="text">
                {{ getLanguageName(movie?.original_language) }}
              </p>
            </div>
          </div>

          <div class="details-row-two">
            <div class="cardBox">
              <h5 class="title">Orçamento</h5>
              <p class="text">{{ formatWithIntl(movie?.budget) }}</p>
            </div>
            <div class="cardBox">
              <h5 class="title">Receita</h5>
              <p class="text">{{ formatWithIntl(movie?.revenue) }}</p>
            </div>
            <div class="cardBox">
              <h5 class="title">Lucro</h5>
              <p class="text">{{ profit(movie?.revenue, movie?.budget) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
