
import { useSelector } from "react-redux";


export const useCalHook = () => {
   const cartData = useSelector(state=> state.cartInfo.cartStore)

   let total = 0;
    let savings = 0;
    cartData.forEach((el) => {
      total += el.product_price*el.cart_item_qty
      savings +=  (el.promocode_offer_type === 'DIS' ? el.product_price*el.cart_item_qty*el.promocode_value/100 : 0)
    })
    return {totalprice: total,totalSaving: savings}
   }
