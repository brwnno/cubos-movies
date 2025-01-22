<script lang="ts" setup>
const filters = ref({
  sort_by: '',
  include_adult: false,
  include_video: false,
  primary_release_date_gte: '',
  primary_release_date_lte: '',
  vote_average_gte: '',
  vote_count_gte: '',
  with_genres: '',
  with_watch_providers: '',
})

const sortOptions = ref([
  {
    id: 'popularity.asc',
    value: 'popularity.asc',
    title: 'Popularidade (Descrescente)',
  },
  {
    id: 'popularity.desc',
    value: 'popularity.desc',
    title: 'Popularidade (Crescente)',
  },
  {
    id: 'vote_average.asc',
    value: 'vote_average.asc',
    title: 'Avaliação (Descrescente)',
  },
  {
    id: 'vote_average.desc',
    value: 'vote_average.desc',
    title: 'Avaliação (Crescente)',
  },
  {
    id: 'vote_count.asc',
    value: 'vote_count.asc',
    title: 'Contagem de Votos (Descrescente)',
  },
  {
    id: 'vote_count.desc',
    value: 'vote_count.desc',
    title: 'Contagem de Votos (Crescente)',
  },
  {
    id: 'original_title.asc',
    value: 'original_title.asc',
    title: 'Título Original (Descrescente)',
  },
  {
    id: 'original_title.desc',
    value: 'original_title.desc',
    title: 'Título Original (Crescente)',
  },
  {
    id: 'title.asc',
    value: 'title.asc',
    title: 'Título (Descrescente)',
  },
  {
    id: 'title.desc',
    value: 'title.desc',
    title: 'Título (Crescente)',
  },

  {
    id: 'revenue.asc',
    value: 'revenue.asc',
    title: 'Receita (Descrescente)',
  },
  {
    id: 'revenue.desc',
    value: 'revenue.desc',
    title: 'Receita (Crescente) ',
  },
])

const userGenre = useState('userGenre') as any

const emit = defineEmits(['ApplyFilters'])

const applyFilters = () => {
  emit('ApplyFilters', filters.value)
}
</script>
<template>
  <div class="filters-container">
    <div class="container">
      <div class="filter-group">
        <label for="sort_by">Ordenar por:</label>
        <select v-model="filters.sort_by" id="sort_by">
          <option
            v-for="option in sortOptions"
            :key="option.id"
            :value="option.value"
          >
            {{ option.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="primary_release_date_gte">Data de Lançamento</label>
        <input
          type="date"
          v-model="filters.primary_release_date_gte"
          id="primary_release_date_gte"
        />
      </div>

      <div class="filter-group">
        <label for="vote_average_gte">Avaliação Mínima</label>
        <input
          type="number"
          v-model="filters.vote_average_gte"
          id="vote_average_gte"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      <div class="filter-group">
        <label for="vote_count_gte">Contagem de Votos Mínima</label>
        <input
          type="number"
          v-model="filters.vote_count_gte"
          id="vote_count_gte"
          min="0"
        />
      </div>
      <div class="filter-group">
        <label for="with_genres">Gêneros</label>
        <select v-model="filters.with_genres" id="with_genres">
          <option
            v-for="option in userGenre"
            :key="option?.id"
            :value="option?.id"
          >
            {{ option?.name }}
          </option>
        </select>
      </div>
      <div class="">
        <button class="apply-filters-button" @click="applyFilters">
          Aplicar Filtros
        </button>
      </div>
    </div>
  </div>
</template>
