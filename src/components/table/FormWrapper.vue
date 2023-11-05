<template>
  <div class="form_wrapper">
    <div v-for="field in formDataFields" :key="field.id">
      <InputBlock
        v-model="field.value"
        :labelText="field.id"
        :id="field.id"
        :validation="field.validation"
        @checkValidation="checkValidation"
      />
    </div>
    <button class="form_wrapper__button" @click="checkFormValidity">
      Send
    </button>
  </div>
</template>

<script>
import InputBlock from "../unevrsal-components/InputBlock.vue";

export default {
  name: "FormWrapper",
  components: { InputBlock },
  data() {
    return {
      validate: [],
    };
  },
  computed: {
    formDataFields() {
      return this.$store.getters.formFields;
    },
  },
  methods: {
    checkFormValidity() {
      if (this.validate.every((field) => field.validate === true)) this.onSubmit();
    },
    checkValidation({ id, validate }) {
      if (this.validate.filter((field) => field.id === id).length) {
        this.validate.forEach((field) => {
          field.id === id ? (field.validate = validate) : null;
        });
      } else {
        this.validate.push({ id, validate });
      }
    },
    onSubmit() {
      this.$store.commit("updateFormData", this.formDataFields);

      this.formDataFields.forEach((field) => {
        field.value = "";
      });
    },
  },
};
</script>

<style lang="scss">
.form_wrapper {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__button {
    margin: 15px;
    min-width: 100px;
  }
}
</style>
