<template>
  <div>
    <h3>Sort By</h3>
    <div>
      <div v-for="(rule, index) in sortBy" :key="index">
        {{ rule }}
        <button @click="removeSortRule(index)">Remove</button>
      </div>
      <div>
        <select v-model="selectedSortRule" @change="addSortRule">
          <option disabled>Choose option</option>
          <option v-for="id in chooseSortRule" :key="id" :value="id">
            {{ id }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortWrapper",
  data() {
    return {
      selectedSortRule: null,
    }
  },
  methods: {
    addSortRule() {
      if (this.selectedSortRule && !this.sortBy.includes(this.selectedSortRule)) {
        this.sortBy.push(this.selectedSortRule)
      }
    },
    removeSortRule(index) {
      this.sortBy.splice(index, 1)
    },
  },
  computed: {
    sortBy() {
      return this.$store.getters.sortBy
    },
    chooseSortRule() {
      return this.$store.getters.formFields.map((field) => field.id)
    },
  },
}
</script>

<style lang="scss"></style>
