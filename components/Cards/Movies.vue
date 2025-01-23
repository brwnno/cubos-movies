<script setup lang="ts">
import type { Movies } from '~/type/Movies'

import { useGenre } from '~/composables/useGenre'

defineProps<{
  movies: Movies[]
}>()

function toPercentage(value: number) {
  let percentage = Math.round(value * 1000)
  percentage = Math.round(percentage / 100)
  return `${percentage}`
}

const { genre } = useGenre()
 useState('userGenre', () => genre)
function FindByGenreIds(ids: any) {
  const genreIds = ids.map((id: number) => {
    const genres = genre.value.find((genreId) => genreId.id === id)
    return genres ? genres.name : null
  })

  return genreIds.join(', ')
}
</script>

<template>
  <section class="cards">
    <div class="background">
      <div class="cards-container">
        <article
          v-for="(card, index) in movies"
          :key="index"
          class="card"
          aria-labelledby="card-title-{{ index }}"
        >
          <a :href="`/${card.id}`" :title="card?.title">
            <figure class="card-image">
              <picture>
                <NuxtImg
                  :src="`https://image.tmdb.org/t/p/w500${card.poster_path}`"
                  :alt="card.title"
                  :title="card.title"
                  format="webp"
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

              <figcaption class="hover-overlay">
                <div class="rating-container">
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
                        :stroke-dasharray="
                          toPercentage(card.vote_average) + ', 100'
                        "
                        d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span class="percentage">
                      {{ toPercentage(card.vote_average) }}
                      <small>%</small>
                    </span>
                  </div>
                </div>

                <div class="text-overlay">
                  <h3>{{ card.title }}</h3>
                  <div class="genre">
                    <p>{{ FindByGenreIds(card.genre_ids) }}</p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
