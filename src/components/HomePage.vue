<template>
  <div id="home-page">
    <FormWrapper />
    <SortWrapper />
    <FiltersWrapper />
    <TableWrapper />
  </div>
</template>

<script>
import FormWrapper from './table/FormWrapper.vue'
import TableWrapper from './table/TableWrapper'
import FiltersWrapper from './table/FiltersWrapper'
import SortWrapper from './table/SortWrapper'

export default {
  name: 'HomePage',
  components: {FormWrapper, TableWrapper, FiltersWrapper, SortWrapper}
}
</script>

<style lang="scss">
#home-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
