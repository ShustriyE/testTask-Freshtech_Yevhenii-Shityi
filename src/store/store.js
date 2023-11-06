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
    filterRules: {
      include: [],
      exclude: []
    },
    sortBy: ['name', 'email'],
  },
  mutations: {
    updateFormData(state, data) {
      const convertData = data.reduce((result, field) => {
        result[field.id] = field.value
        return result
      }, {})
      
      state.formData.push(convertData)
    },
    addFilterRule(state, { type, rules }) {
      state.filterRules[type].push(rules)
    },
    removeFilterRule(state, { type, index }) {
      state.filterRules[type].splice(index, 1)
    },
  },
  actions: {
    addIncludeFilterRule({ commit }, rules) {
      commit('addFilterRule', { type: 'include', rules })
    },
    addExcludeFilterRule({ commit }, rules) {
      commit('addFilterRule', { type: 'exclude', rules })
    },
    removeIncludeFilterRule({ commit }, index) {
      commit('removeFilterRule', { type: 'include', index })
    },
    removeExcludeFilterRule({ commit }, index) {
      commit('removeFilterRule', { type: 'exclude', index })
    },
  },
  getters: {
    formFields: state => state.formConfig.fields,
    formData: state => state.formData,
    filterRules: state => state.filterRules,
    sortBy: state => state.sortBy,
    filteredFormData: (state) => {
      const { include, exclude } = state.filterRules

      if (include.length > 0) {
      let includedData = state.formData.filter(item => {
        return include.some(ruleGroup => {
          const rules = Object.entries(ruleGroup).map(([key, value]) => ({ [key]: value }))
          return rules.every(rule => Object.entries(rule).every(([key, value]) => item[key].includes(value)))
        })
      })

      let filteredData = includedData.filter(item => {
        return !exclude.some(ruleGroup => {
          const rules = Object.entries(ruleGroup).map(([key, value]) => ({ [key]: value }))
          return rules.every(rule => Object.entries(rule).every(([key, value]) => item[key].includes(value)))
        })
      })
      
      return filteredData
      } else {
        let filteredData = state.formData.filter(item => {
        return !exclude.some(ruleGroup => {
          const rules = Object.entries(ruleGroup).map(([key, value]) => ({ [key]: value }))
          return rules.every(rule => Object.entries(rule).every(([key, value]) => item[key].includes(value)))
          })
        })
    
          return filteredData
      }
    },
    sortFilteredData: (state, getters) => {
        const sortedData = getters.filteredFormData.slice().sort((a, b) => {
          for (const field of state.sortBy) {
            if (a[field] < b[field]) return -1
            if (a[field] > b[field]) return 1
          }
          return 0
        })
        return sortedData
    },
  }
})