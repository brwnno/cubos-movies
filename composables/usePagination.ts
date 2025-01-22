// ~/composables/usePagination.ts
import { computed, ref } from 'vue'

export function usePagination(totalItems: number, itemsPerPage: number) {
  // Número total de páginas
  const totalPages = computed(() => Math.ceil(totalItems / itemsPerPage))

  // Página atual
  const currentPage = ref(1)

  /**
   * Gera o array de páginas com os intervalos de itens
   * @returns Array de objetos contendo as páginas e intervalos de itens
   */
  function generatePages() {
    const pages = []
    for (let page = 1; page <= totalPages.value; page++) {
      const startItem = (page - 1) * itemsPerPage + 1
      const endItem = Math.min(page * itemsPerPage, totalItems)

      pages.push({
        page,
        startItem,
        endItem,
      })
    }
    return pages
  }

  /**
   * Retorna os dados da página atual
   * @returns Dados da página atual com os índices e os itens
   */
  function getPageData() {
    const startItem = (currentPage.value - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage.value * itemsPerPage, totalItems)

    return {
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      startItem,
      endItem,
      items: Array.from(
        { length: endItem - startItem },
        (_, i) => startItem + i
      ), // Itens simulados para a página atual
    }
  }

  /**
   * Muda a página
   * @param page Número da página a ser acessada
   */
  function changePage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    totalPages,
    currentPage,
    generatePages,
    getPageData,
    changePage,
  }
}
