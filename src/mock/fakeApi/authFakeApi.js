import { Response } from 'miragejs'


export default function authFakeApi(server, apiPrefix) {

    server.post(`${apiPrefix}/sign-in`, (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody)
        const user = schema.db.usersData.findBy({ accountEmail: email, password })
        if (user) {
            return {
                user,
                token: 'wVYrxaeNa9OxdnULvde1Au5m5w63'
            }
        }
        return new Response(401, { some: 'header' }, { message: 'Email mật khẩu chưa đúng vui lòng nhập lại!' })
    })

    server.post(`${apiPrefix}/sign-out`, () => {
        return true
    })

}