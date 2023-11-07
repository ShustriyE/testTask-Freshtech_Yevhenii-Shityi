<template>
  <div id="home-page">
    <LocaleComponent />
    <FormWrapper />
    <SortWrapper />
    <FiltersWrapper />
    <TableWrapper />
  </div>
</template>

<script>
import LocaleComponent from './LocaleComponent.vue'
import FormWrapper from './table/FormWrapper.vue'
import TableWrapper from './table/TableWrapper'
import FiltersWrapper from './table/FiltersWrapper'
import SortWrapper from './table/SortWrapper'

export default {
  name: 'HomePage',
  components: {LocaleComponent, FormWrapper, TableWrapper, FiltersWrapper, SortWrapper}
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
