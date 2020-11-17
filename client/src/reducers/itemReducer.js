import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM } from '../actions/types'

const initialState = {
    items: [],
    loading: true,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case UPDATE_ITEM:
            state.items.forEach(item => {
                if (item._id !== action.payload._id && item.phase !== action.payload.phase) {
                    var index = state.items.findIndex(function (o) {
                        return o._id === action.payload._id;
                    })
                    if (index !== -1) state.items.splice(index, 1);
                   }
            })
            return {
                ...state,
                items: state.items
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
      }
}
