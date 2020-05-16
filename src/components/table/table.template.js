const CODES = { A: 65, Z: 90 }
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const toChar = (_, index) => String.fromCharCode(CODES.A + index)
const getWidth = ({ colsState }, index) => `${colsState[index] || DEFAULT_WIDTH}px`
const withWidthFrom = (state) => (col, index) => ({ col, index, width: getWidth(state, index) })
const toColumn = ({ col, index, width }) =>
  `<div 
    class="column disable-select" 
    style="width:${width};" 
    data-type="resizable"
    data-col=${index}
    >
    ${col}
    <div class="col-resize" data-resize="col"></div>
   </div>`


const toCell = (row, state) => (_, col) => {
  const id = `${row}:${col}`
  return ` <div 
       class="cell"
       style="width: ${getWidth(state, col)}"
       contenteditable
       data-type="cell"
       data-id="${id}"
       data-col=${col}
       >${state.dataState[id] || ''}
     </div>`
}

const getHeight = ({ rowsState }, index) => `${rowsState[index] || DEFAULT_HEIGHT}px`

function createRow(index, content, height) {
       
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div
      class="row disable-select"
      style="height:${height}"
      data-row=${index}
      data-type="resizable"
      >
      <div class="row-info">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const cols = [...Array(colsCount)]
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  const rows = [createRow(null, cols, `${DEFAULT_HEIGHT}px`)]

  for (let row = 0; row < rowsCount; row++) {
    const cells = [...Array(colsCount)].map(toCell(row, state)).join('')
    const height = getHeight(state, row + 1)

    rows.push(createRow(row + 1, cells, height))
  }

  return rows.join('')
}
