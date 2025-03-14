
import { createServer } from 'miragejs'
import appConfig from '../configs/app.config'
import productsData from './data/product.json'
import usersData from "./data/user.json"
import ordersData from "./data/order.json"

import {
    productFakeApi,
    authFakeApi,
    orderFakeApi
} from './fakeApi'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                productsData,
                usersData,
                ordersData
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough(request => {
                let isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()
            orderFakeApi(this, apiPrefix)
            productFakeApi(this, apiPrefix)
            authFakeApi(this, apiPrefix)
        },
    })
}