import { types } from 'mobx-state-tree'

export const createBaseModel = (name, properties = {}) => {
  return types.model(name, {
    id: types.identifier,
    createdAt: types.optional(types.Date, () => new Date()),
    updatedAt: types.optional(types.Date, () => new Date()),
    ...properties
  })
}

export const createReferenceModel = (name, properties = {}) => {
  return createBaseModel(name, {
    name: types.string,
    ...properties
  })
}

export const createPriceModel = (name, properties = {}) => {
  return createBaseModel(name, {
    price: types.number,
    isActive: types.optional(types.boolean, true),
    ...properties
  })
} 