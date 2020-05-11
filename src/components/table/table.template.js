const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `
    <div class="cell" contenteditable data-col=${col}></div>
  `
}

function toColumn(col, index) {
    return `
    <div class="column disable-select" data-type="resizable" data-col=${index}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row disable-select" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
    const rows = []
    const cols = [...Array(colsCount)].map(toChar).map(toColumn).join('')
    const cells = [...Array(colsCount)].map(toCell).join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}
