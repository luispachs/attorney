import { types } from 'mobx-state-tree'

const Attorney = types
  .model('Attorney', {
    id: types.optional(types.string, ''),
    name: types.string,
    email: types.string,
    phone: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    isActive: types.optional(types.boolean, true),
    createdAt: types.optional(types.string,""),
    updatedAt: types.optional(types.string, "")
  })
  .actions(self => ({
    update(data) {
      Object.assign(self, data)
    }
  }))

export default Attorney
