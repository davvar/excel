import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { shouldResize, isCell } from '@/components/table/table.functions'
import { TableSelection } from './Table.selection'
import { $ } from '@core/dom'
import { matrix, nextSelector } from '@core/utils'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor ($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.unsubs = []
  }

  toHTML() {
    return createTable(34)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => this.selection.current.focus())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($cell)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'ArrowRight']

    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const { col, row } = this.selection.current.id(true)
      this.selectCell(this.$root.find(nextSelector(key, col, row)))
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
