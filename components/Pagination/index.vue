<script setup lang="ts">
import { ref, computed } from 'vue'

const { pageCurrent, pagesTotal } = defineProps<{
  pageCurrent: number
  pagesTotal: number
}>()

const emit = defineEmits(['pagination'])
const totalPerPage = ref(5)
const page = ref(pageCurrent)
const getPages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= pagesTotal; i++) {
    pages.push(i)
  }

  const halfRange = Math.floor(totalPerPage.value / 2)

  let startPage = page.value
  let endPage = page.value + totalPerPage.value - 1

  if (page.value === 1) {
    endPage = Math.min(totalPerPage.value, pagesTotal)
  } else if (page.value === pagesTotal) {
    startPage = Math.max(1, pagesTotal - totalPerPage.value + 1)
    endPage = pagesTotal + 1
  } else {
    startPage = page.value - halfRange
    if (startPage < 1) startPage = 1
    endPage = startPage + totalPerPage.value - 1
    if (endPage > pagesTotal) {
      endPage = pagesTotal
      startPage = endPage - totalPerPage.value + 1
    }
  }

  return pages.slice(startPage - 1, endPage)
})

function changePage(pageItem: number) {
  page.value = pageItem
  emit('pagination', pageItem)
}
</script>

<template>
  <div class="pagination">
    <button
      class="pagination-btn prev"
      aria-label="Previous Page"
      :disabled="page <= 1"
      @click="changePage(page - 1)"
    >
      <Icon
        aria-label="Next Page"
        name="lets-icons:expand-left-light"
        width="24"
        height="24"
      />
    </button>

    <ul
      v-for="(pageitem, index) in getPages"
      :key="index"
      class="pagination-btn"
      :class="{ active: pageitem === page }"
      @click="changePage(pageitem)"
    >
      <li>{{ pageitem }}</li>
    </ul>

    <button
      class="pagination-btn next"
      aria-label="Next Page"
      :disabled="page >= pagesTotal"
      @click="changePage(page + 1)"
    >
      <Icon
        aria-label="Next Page"
        name="lets-icons:expand-right-light"
        width="24"
        height="24"
      />
    </button>
  </div>
</template>
