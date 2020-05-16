/* eslint-disable no-case-declarations */
import * as types from './action-types'

export function rootReducer(state, { type, data }) {
    let prevState
    switch (type) {
        case types.TABLE_RESIZE:
            const field = data.type === 'col' ? 'colsState' : 'rowsState'
            prevState = state[field] || {}
            prevState[data.id] = data.value
            return { ...state, [field]: prevState }
        case types.CHANGE_TEXT:
            prevState = state.dataState || {}
            prevState[data.id] = data.value
            return { ...state, currentText: data.value, dataState: prevState }
        default: return state
    }
}

