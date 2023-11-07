<template>
  <div class="input_wrapper">
    <label :for="'input_' + id" class="input_wrapper__label">{{
      labelText.toUpperCase()
    }}</label>
    <input
      v-model="currentValue"
      :id="'input_' + id"
      type="text"
      class="input_wrapper__input"
      :class="{ validate: !isValidateInput }"
      @change="validateInput"
    />
  </div>
</template>

<script>
export default {
  name: "InputBlock",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    validation: {
      type: Function,
      required: false,
    },
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
    isValidateInput() {
      if(this.validation) {
        return this.currentValue.length > 0
        ? this.validation(this.currentValue)
        : true
      }
      return true
    },
  },
  methods: {
    validateInput() {
      if(this.validation) {
        this.$emit("checkValidation", {id: this.id, validate: this.validation(this.currentValue)})
      }
    },
  },
};
</script>

<style lang="scss">
.input_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  &__label {
    padding: 5px;
  }

  &__input {
    padding: 5px;
    width: 15vw;
    min-width: 170px;
  }

  &__validate {
    margin-top: 15px;
    padding: 10px;
    background-color: #da8282;
    border-radius: 15px;
  }
}

.validate {
  border: 1px solid red;
}
</style>
