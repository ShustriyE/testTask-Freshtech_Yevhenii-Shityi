<template>
<div class="wrapper">
      <h3>{{$t(headerText)}}</h3>
      <div>
        <div
          v-for="(rule, index) in filtersList"
          :key="index"
          class="relative_wrapper filters_added"
        >
          <span v-for="(value, key) in rule" :key="key"
            >{{ key }}: {{ value }}
          </span>
          <div @click="removeFilter(index)" class="button remove">+</div>
        </div>
      </div>
      <div
        v-if="showFiltersInput"
        class="relative_wrapper inputs_wrapper"
      >
        <div
          v-for="(field, index) in fieldsList"
          :key="index"
          class="relative_wrapper inputs_wrapper__fields"
        >
          <select v-model="field.filterId">
            <option disabled>{{$t('choose_option')}}</option>
            <option v-for="id in chooseField" :key="id" :value="id">
              {{ id }}
            </option>
          </select>
          <input type="text" v-model="field.filterText" />
          <div @click="removeField(index)" class="button remove_filter">
            +
          </div>
        </div>
        <div class="buttons_filter__wrapper">
          <div @click="addFilter" class="button add">{{$t('add_filters')}}</div>
          <div @click="addField" class="button add">{{$t('add_field')}}</div>
        </div>
      </div>
      <div @click="setShowFiltersInput" class="button add">
        {{
          showFiltersInput
            ? $t('close_filter_settings')
            : $t(buttonText)
        }}
      </div>
    </div>
</template>

<script>
export default {
  name: "FilterBlock",
  props: {
    headerText: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    filtersList: {
      type: Array,
      required: true,
    },
    fieldsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showFiltersInput: false,
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit("input", newValue)
      },
    },
    formFields() {
      return this.$store.getters.formFields
    },
    chooseField() {
      return this.formFields.map((field) => field.id)
    },
  },
  methods: {
    addFilter() {
      this.$emit('addFilter')
    },
    removeFilter(index) {
      this.$emit('removeFilter', index)
    },
    addField() {
      this.$emit('addField')
    },
    removeField(index) {
      this.$emit('removeField', index)
    },
    setShowFiltersInput() {
      this.showFiltersInput = !this.showFiltersInput
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
  left: -18px;
  top: -10px;
  rotate: 50deg;
  width: 1px;
  font-size: 21px;
  color: red;

  &_filter {
    position: absolute;
    right: -17px;
    top: -8px;
    rotate: 50deg;
    width: 1px;
    font-size: 21px;
    color: red;
  }
}
</style>
