import wildCardSearch from "../../utils/wildCardSearch"

export default function productFakeApi(server, apiPrefix) {
    server.post(`${apiPrefix}/product/list`, (schema, { requestBody }) => {
        const { search } = JSON.parse(requestBody)
        let data = schema.db.productsData

        if (search) {
            data = wildCardSearch(data, search)
        }

        return data
    })


    server.post(`${apiPrefix}/product`, (schema, { requestBody }) => {
        const { id } = JSON.parse(requestBody)
        const product = schema.db.productsData.find(id)
        return product
    })

}





