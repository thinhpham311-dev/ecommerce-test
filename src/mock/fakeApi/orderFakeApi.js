import makeId from "../../utils/makeId"

export default function orderFakeApi(server, apiPrefix) {
    server.post(`${apiPrefix}/order/submit`, (schema, { requestBody }) => {
        const data = JSON.parse(requestBody)
        schema.db.ordersData.insert({
            order_id: makeId(5),
            order_status: "pending",
            ...data
        })
        return schema.db.ordersData
    })

}