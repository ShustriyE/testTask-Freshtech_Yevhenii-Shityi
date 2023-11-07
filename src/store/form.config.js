const formConfig = {
  fields: [
    {id: 'name', value: '', validation: (value) => value.length > 3},
    {id: 'phone', value: '', validation: (value) => value.slice(1).split('').every(number => !isNaN(number)) && value.length >= 10 },
    {id: 'email', value: '', validation: (value) => value.includes('@')},
  ]
}

export default formConfig