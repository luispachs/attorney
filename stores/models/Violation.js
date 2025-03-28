import { types } from 'mobx-state-tree'

const Violation = types.model('Violation', {
  _id: types.optional(types.string,""),
  name:types.string,
  code: types.string,
  description: types.string,
})

export default Violation 