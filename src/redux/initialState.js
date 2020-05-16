import { storage } from '@core/utils'

const defaultState = {
    rowsState: {},
    colsState: {},
    dataState: {},
    currentText: ''
}

export const initialState = storage('excel-state') || defaultState