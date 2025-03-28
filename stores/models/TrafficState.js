import { types } from "mobx-state-tree"


const TrafficState =  types.model(
    "TrafficState",
    {
        _id:types.optional(types.string,""),
        longName:types.string,
        shortName:types.string,
        enabled:types.boolean
    }
)


export default TrafficState