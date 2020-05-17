import { Router } from './core/router/Router'
import { DashboardPage } from './pages/Dashboad.page'
import { ExcelPage } from './pages/Excel.page'

import './scss/index.scss' 

new Router('#app', {
    dashoard: DashboardPage,
    excel: ExcelPage
})

