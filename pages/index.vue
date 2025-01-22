<script setup lang="ts">
const search = ref<string>('')
const currentPage = ref(1)
const filter = ref<any | null>(null)
const isExistOtherFilter = ref(false)

function getBy(event: string) {
  search.value = event
}

function ApplyFilters(eventfilter: any) {
  filter.value = eventfilter
}

function isExist(eventisExist: boolean) {
  isExistOtherFilter.value = eventisExist
}

function pagination(eventpaginationt: number) {
  currentPage.value = eventpaginationt
}

const { movies, total } = useMovies(search, currentPage, filter)

onMounted(() => {
  search.value = ''
  currentPage.value = 1
  filter.value = null
})
</script>

<template>
  <div class="main-container">
    <div class="content">
      <Filters @getBy="getBy" @isExist="isExist" />
      <div class="overlayTesete"></div>
      <FiltersComponentsOthers
        @ApplyFilters="ApplyFilters"
        v-if="isExistOtherFilter"
      />
      <CardsMovies :movies="movies" />
      <Pagination
        :pageCurrent="currentPage"
        :pagesTotal="total"
        @pagination="pagination"
      />
    </div>
  </div>
</template>
