import ApiService from "./ApiService"

export async function apiGetProductsData(data) {
    return ApiService.fetchData({
        url: '/product/list',
        method: 'post',
        data
    })
}

export async function apiGetProductData(data) {
    return ApiService.fetchData({
        url: '/product',
        method: 'post',
        data
    })
}

