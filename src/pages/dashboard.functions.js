function toHTML(tableKey) {
    const { title, openedDate } = JSON.parse(localStorage.getItem(tableKey))
    const tableId = tableKey.split(':')[1]

    return `
     <li class="db__record">
          <a href="#excel/${tableId}">${title}</a>
          <strong>${openedDate}</strong>
     </li>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.includes('excel')) {
            keys.push(key)
        }
    }

    return keys
}

export function createRecorsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<h3>There is no table yet.</h3>`
    }

    return ` 
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>`
}


