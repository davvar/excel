const CHAR_CODES = {
    A: 65,
    Z: 90
}

function toCell() {
    return `
         <div class="cell" contenteditable></div>
    `
}

function toColumn(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index || ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CHAR_CODES.A + index)
}

export function createTable(rowsCount = 10) {
    const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
    const rows = []
    const cols = [...Array(colsCount)].map(toChar).map(toColumn).join('')
    const cells = [...Array(colsCount)].map(toCell).join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}