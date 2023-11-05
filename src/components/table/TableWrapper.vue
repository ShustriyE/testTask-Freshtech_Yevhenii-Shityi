<template>
  <div class="table_wrapper">
    <table class="table_wrapper__table">
      <thead>
      <tr>
        <th
        class="table_wrapper__table__th"
        v-for="key in keysRender" :key="key"
        >
        {{ key.toUpperCase() }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="field in formData" :key="field.id">
        <td
        v-for="key in keysRender" :key="key"
        class="table_wrapper__table__td"
        >
        {{ field[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: 'TableWrapper',
  computed: {
    formData() {
      if(this.$store.getters.formData.length >= 0) {
        return this.$store.getters.formData
      }
      return null
    },
    keysRender() {
      if (this.formData.length > 0) {
        return Object.keys(this.formData[0]);
      }
      return [];
    }
  },
}
</script>

<style lang="scss">
.table_wrapper {
  padding: 15px;
  
  &__table{
    &__th, &__td{
      display: inline-block;
      min-width: 200px;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
