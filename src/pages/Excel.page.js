import { Page } from "../core/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@core/store/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitialState } from "../redux/initialState";
import { StatesProcessor } from "../core/StatesProcessor";
import { LocalStorageClient } from "../core/clients/LocalStorageClient";

export class ExcelPage extends Page {
    constructor (param) {
        super(param)

        this.storeSub = null
        this.processor = new StatesProcessor(
            new LocalStorageClient(this.params),
            400
        )
    }

    async getRoot() {
        const state = await this.processor.get()
        const store = createStore(rootReducer, normalizeInitialState(state))

        this.storeSub = store.subscribe(this.processor.listen)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }
}