<template>
  <div class="wrapper">
    <div class="wrapper">
      <h3>{{$t('include_filters')}}</h3>
      <div>
        <div
          v-for="(rule, index) in includeFilters"
          :key="index"
          class="relative_wrapper filters_added"
        >
          <span v-for="(value, key) in rule" :key="key"
            >{{ key }}: {{ value }}
          </span>
          <div @click="removeIncludeFilter(index)" class="button remove">+</div>
        </div>
      </div>
      <div
        v-if="showIncludeFiltersInput"
        class="relative_wrapper inputs_wrapper"
      >
        <div
          v-for="(field, index) in inputFields"
          :key="index"
          class="relative_wrapper inputs_wrapper__fields"
        >
          <select v-model="field.filterIncludeId">
            <option disabled>{{$t('сhoose_option')}}</option>
            <option v-for="id in chooseField" :key="id" :value="id">
              {{ id }}
            </option>
          </select>
          <input type="text" v-model="field.filterIncludeText" />
          <div @click="removeIncludeField(index)" class="button remove_filter">
            +
          </div>
        </div>
        <div class="buttons_filter__wrapper">
          <div @click="addIncludeFilter" class="button add">{{$t('add_filters')}}</div>
          <div @click="addIncludeField" class="button add">{{$t('add_field')}}</div>
        </div>
      </div>
      <div @click="showFiltersInputInclude" class="button add">
        {{
          showIncludeFiltersInput
            ? $t('close_filter_settings')
            : $t('add_include_filter')
        }}
      </div>
    </div>
    <div class="wrapper">
      <h3>{{$t('exclude_filters')}}</h3>
      <div>
        <div
          v-for="(rule, index) in excludeFilters"
          :key="index"
          class="relative_wrapper filters_added"
        >
          <span v-for="(value, key) in rule" :key="key"
            >{{ key }}: {{ value }}
          </span>
          <div @click="removeExcludeFilter(index)" class="button remove">+</div>
        </div>
      </div>
      <div
        v-if="showExcludeFiltersInput"
        class="relative_wrapper inputs_wrapper"
      >
        <div
          v-for="(field, index) in excludeFields"
          :key="index"
          class="relative_wrapper"
        >
          <select v-model="field.filterExcludeId">
            <option disabled>{{$t('сhoose_option')}}</option>
            <option v-for="id in chooseField" :key="id" :value="id">
              {{ id }}
            </option>
          </select>
          <input type="text" v-model="field.filterExcludeText" />
          <div @click="removeExcludeField(index)" class="button remove_filter">
            +
          </div>
        </div>
        <div class="buttons_filter__wrapper">
          <div @click="addExcludeFilter" class="button add">{{$t('add_filters')}}</div>
          <div @click="addExcludeField" class="button add">{{$t('add_field')}}</div>
        </div>
      </div>
      <div @click="showFiltersInputExclude" class="button add">
        {{
          showExcludeFiltersInput
            ? $t('close_filter_settings')
            : $t('add_exclude_filter')
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FiltersWrapper",
  data() {
    return {
      filterIncludeId: "",
      filterIncludeText: "",
      filterExcludeId: "",
      filterExcludeText: "",
      showIncludeFiltersInput: false,
      showExcludeFiltersInput: false,
      inputFields: [{ filterIncludeId: "", filterIncludeText: "" }],
      excludeFields: [{ filterExcludeId: "", filterExcludeText: "" }],
    }
  },
  methods: {
    formatFiltersRule(obj) {
      const result = obj.reduce((result, currentObject) => {
        const { filterIncludeId, filterIncludeText } = currentObject
        result[filterIncludeId] = filterIncludeText
        return result
      }, {})
      if (Object.values(result).every((value) => value.length > 0)) {
        return result
      }
    },
    addIncludeFilter() {
      this.$store.dispatch(
        "addIncludeFilterRule",
        this.formatFiltersRule(this.inputFields)
      )
      this.inputFields = [{ filterIncludeId: "", filterIncludeText: "" }]
    },
    addExcludeFilter() {
      this.$store.dispatch(
        "addExcludeFilterRule",
        this.formatFiltersRule(this.inputFields)
      )
      this.excludeFields = [{ filterExcludeId: "", filterExcludeText: "" }]
    },
    removeIncludeFilter(index) {
      this.$store.dispatch("removeIncludeFilterRule", index)
    },
    removeExcludeFilter(index) {
      this.$store.dispatch("removeExcludeFilterRule", index)
    },
    showFiltersInputInclude() {
      this.showIncludeFiltersInput = !this.showIncludeFiltersInput
    },
    showFiltersInputExclude() {
      this.showExcludeFiltersInput = !this.showExcludeFiltersInput
    },
    addIncludeField() {
      this.inputFields.push([{ filterIncludeId: "", filterIncludeText: "" }])
    },
    removeIncludeField(index) {
      if (this.inputFields.length > 1) {
        this.inputFields.splice(index, 1)
      } else {
        this.inputFields = [{ filterIncludeId: "", filterIncludeText: "" }]
        this.showIncludeFiltersInput = false
      }
    },
    addExcludeField() {
      this.excludeFields.push([{ filterExcludeId: "", filterExcludeText: "" }])
    },
    removeExcludeField(index) {
      if (this.excludeFields.length > 1) {
        this.excludeFields.splice(index, 1)
      } else {
        this.excludeFields = [{ filterExcludeId: "", filterExcludeText: "" }]
        this.showExcludeFiltersInput = false
      }
    },
  },
  computed: {
    includeFilters() {
      return this.$store.getters.filterRules.include
    },
    excludeFilters() {
      return this.$store.getters.filterRules.exclude
    },
    formFields() {
      return this.$store.getters.formFields
    },
    chooseField() {
      return this.formFields.map((field) => field.id)
    },
  },
};
</script>

<style lang="scss">
.relative_wrapper {
  position: relative;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50vw;
}

.buttons_filter__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;

  :nth-child(2) {
    margin-left: 5px;
  }
}

.filters_added {
  margin: 5px;
}

.inputs_wrapper {
  min-width: 200px;

  &__fields {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 30vw;
    margin: 5px 0;

    input {
      margin-left: 5px;
    }
  }
}

.button {
  user-select: none;
  padding: 5px;
  text-align: center;
  cursor: pointer;
}

.add {
  border: 1px solid black;
  border-radius: 5px;
}

.remove {
  position: absolute;
  left: -13px;
  top: -5px;
  rotate: 50deg;
  width: 1px;
  font-size: 21px;
  color: red;

  &_filter {
    position: absolute;
    left: 345px;
    top: -5px;
    rotate: 50deg;
    width: 1px;
    font-size: 21px;
    color: red;
  }
}
</style>
