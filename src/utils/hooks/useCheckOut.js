import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAll } from '../../redux/features/Cart/stateSlice';
import { apiPutOrdersData } from "../../services/OrderService";
import { REDIRECT_URL_KEY } from '../../constants/App';
import appConfig from '../../configs/app.config';
import useQuery from './useQuery';

function useCheckOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const [loading, setLoading] = useState(false);

    const handleCheckOut = async (values, cart, totalPrice) => {
        const { fullName, phone, address } = values;

        setLoading(true);
        try {
            const resp = await apiPutOrdersData({
                customer_name: fullName,
                customer_phone: phone,
                customer_address: address,
                order_date: new Date().toLocaleDateString('en-GB'),
                total_price: totalPrice,
                products: cart
            });

            if (resp.data) {
                dispatch(removeAll());
                const redirectUrl = query.get(REDIRECT_URL_KEY);
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
                return {
                    status: 'success',
                    message: 'Thanh toán thành công'
                };
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        handleCheckOut,
        loading
    };
};

export default useCheckOut;