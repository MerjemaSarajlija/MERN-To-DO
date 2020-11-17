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
            console.log(action.payload);
            return {
                ...state,
                items: state.items.map(
                    item => 
                      item._id === action.payload._id
                        //return action payload (modified item) instead of
                        //  original item when item id is updated item id
                        ? action.payload
                        : item//ids not the same, return original item
                  )
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