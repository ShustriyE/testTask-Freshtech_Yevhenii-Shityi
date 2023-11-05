import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formConfig: {
      fields: [
        {id: 'name', value: '', validation: (value) => value.length > 3},
        {id: 'phone', value: '', validation: (value) => value.slice(1).split('').every(number => !isNaN(number)) && value.length >= 10 },
        {id: 'email', value: '', validation: (value) => value.includes('@')},
      ]
    },
    formData: [],
  },
  mutations: {
    updateFormData(state, data) {
      const convertData = data.reduce((result, field) => {
        result[field.id] = field.value;
        return result;
      }, {});
      
      state.formData.push(convertData)
    },
  },
  actions: {

  },
  getters: {
    formFields: state => state.formConfig.fields,
    formData: state => state.formData,
  }
})