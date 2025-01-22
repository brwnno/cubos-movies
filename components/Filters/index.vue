<script setup lang="ts">
const search = ref('')
const isExistOtherFilter = ref(false)

const emit = defineEmits(['getBy', 'isExist'])

function getBySearch() {
  emit('getBy', search.value)
}

function open() {
  isExistOtherFilter.value = true
  emit('isExist', isExistOtherFilter.value)
}

function close() {
  isExistOtherFilter.value = false
  emit('isExist', isExistOtherFilter.value)
}

watch(search, (newValue) => {
  setTimeout(() => {
    if (newValue.length >= 3 || newValue.length === 0) {
      getBySearch()
    }
  }, 300)
})
</script>

<template>
  <main class="filters">
    <div class="search-container">
      <input
        type="text"
        placeholder="Pesquise por filmes"
        class="search-input"
        v-model="search"
        @keyup.enter="getBySearch"
      />
      <div class="search-icon">
        <Icon
          name="lets-icons:search-alt-fill"
          class="icon"
          width="24"
          height="24"
        />
      </div>
    </div>

    <div class="icon">
      <span
        v-if="!isExistOtherFilter"
        class="icon-container-medium"
        @click="open()"
      >
        <Icon name="lets-icons:filter" class="icon" width="24" height="24" />
      </span>
      <span v-else class="icon-container-medium" @click="close()">
        <Icon
          name="lets-icons:close-round"
          class="icon"
          width="24"
          height="24"
        />
      </span>
    </div>
  </main>
</template>
