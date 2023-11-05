<template>
  <div id="home-page">
    <FormWrapper />
    <TableWrapper />
  </div>
</template>

<script>
import FormWrapper from './table/FormWrapper.vue'
import TableWrapper from './table/TableWrapper'

export default {
  name: 'HomePage',
  components: {FormWrapper, TableWrapper}
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
