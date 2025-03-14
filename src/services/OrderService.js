import ApiService from "./ApiService"

export async function apiPutOrdersData(data) {
    return ApiService.fetchData({
        url: '/order/submit',
        method: 'post',
        data
    })
}
