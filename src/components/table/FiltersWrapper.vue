<template>
  <div class="wrapper">

    <FilterBlock
    :headerText="'include_filters'"
    :buttonText="'add_include_filter'"
    :filtersList="includeFilters"
    :fieldsList="includeFields"
    @removeFilter="removeIncludeFilter"
    @addFilter="addIncludeFilter"
    @removeField="removeIncludeField"
    @addField="addIncludeField"
    />

    <FilterBlock
    :headerText="'exclude_filters'"
    :buttonText="'add_exclude_filter'"
    :filtersList="excludeFilters"
    :fieldsList="excludeFields"
    @removeFilter="removeExcludeFilter"
    @addFilter="addExcludeFilter"
    @removeField="removeExcludeField"
    @addField="addExcludeField"
    />

  </div>
</template>

<script>
import FilterBlock from '../unevrsal-components/FilterBlock.vue'

export default {
  name: "FiltersWrapper",
  components: {FilterBlock},
  data() {
    return {
      includeFields: [{ filterId: "", filterText: "" }],
      excludeFields: [{ filterId: "", filterText: "" }],
    }
  },
  computed: {
    includeFilters() {
      return this.$store.getters.filterRules.include
    },
    excludeFilters() {
      return this.$store.getters.filterRules.exclude
    },
  },
  methods: {
    formatFiltersRule(obj) {
      const result = obj.reduce((result, currentObject) => {
        const { filterId, filterText } = currentObject
        result[filterId] = filterText
        return result
      }, {})
      if (Object.values(result).every((value) => value.length > 0)) {
        return result
      }
    },
    addIncludeFilter() {
      this.$store.dispatch(
        "addIncludeFilterRule",
        this.formatFiltersRule(this.includeFields)
      )
      this.includeFields = [{ filterId: "", filterText: "" }]
    },
    addExcludeFilter() {
      this.$store.dispatch(
        "addExcludeFilterRule",
        this.formatFiltersRule(this.excludeFields)
      )
      this.excludeFields = [{ filterId: "", filterText: "" }]
    },
    removeIncludeFilter(index) {
      this.$store.dispatch("removeIncludeFilterRule", index)
    },
    removeExcludeFilter(index) {
      this.$store.dispatch("removeExcludeFilterRule", index)
    },
    addIncludeField() {
      this.includeFields.push([{ filterId: "", filterText: "" }])
    },
    addExcludeField() {
      this.excludeFields.push([{ filterId: "", filterText: "" }])
    },
    removeIncludeField(index) {
      if (this.includeFields.length > 1) {
        this.includeFields.splice(index, 1)
      } else {
        this.includeFields = [{ filterId: "", filterText: "" }]
      }
    },
    removeExcludeField(index) {
      if (this.excludeFields.length > 1) {
        this.excludeFields.splice(index, 1)
      } else {
        this.excludeFields = [{ filterId: "", filterText: "" }]
      }
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50vw;
}
</style>
