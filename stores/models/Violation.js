import { types } from 'mobx-state-tree'

const Violation = types.model('Violation', {
  id: types.identifier,
  code: types.string,
  description: types.string,
  defaultPoints: types.maybeNull(types.number)
})

export default Violation 