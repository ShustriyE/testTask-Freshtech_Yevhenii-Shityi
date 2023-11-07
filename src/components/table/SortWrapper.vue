<template>
  <div>
    <h3>{{$t('sort_by')}}</h3>
    <div class="relative_wrapper">
      <div v-for="(rule, index) in sortBy" :key="index" class="relative_wrapper rules">
        {{ rule }}
        <div @click="removeSortRule(index)" class="remove_button">+</div>
      </div>
      <div>
        <select v-model="selectedSortRule" @change="addSortRule">
          <option disabled>{{$t('choose_option')}}</option>
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
    };
  },
  computed: {
    sortBy() {
      return this.$store.getters.sortBy;
    },
    chooseSortRule() {
      return this.$store.getters.formFields.map((field) => field.id);
    },
  },
  methods: {
    addSortRule() {
      if (
        this.selectedSortRule &&
        !this.sortBy.includes(this.selectedSortRule)
      ) {
        this.sortBy.push(this.selectedSortRule);
      }
    },
    removeSortRule(index) {
      this.sortBy.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.relative_wrapper {
  position: relative;
}

.rules {
  margin: 5px;
}

.remove_button {
  user-select: none;
  cursor: pointer;
  position: absolute;
  left: -13px;
  top: -5px;
  rotate: 50deg;
  width: 1px;
  font-size: 21px;
  color: red;
}
</style>
