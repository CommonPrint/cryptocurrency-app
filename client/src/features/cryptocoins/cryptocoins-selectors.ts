import { RootState } from 'store';

export const selectCryptoCoinsInfo = (state: RootState) => ({
  status: state.cryptocoins.status,
  error: state.cryptocoins.error,
  qty: state.cryptocoins.list.data.length
})

export const selectAllCryptoCoins = (state: RootState) => state.cryptocoins;

export const selectVisibleCryptoCoins = (state: RootState, { search = ''}) => {

  return state.cryptocoins.list.data.filter(
    cryptocurrency => (
      cryptocurrency.name.toLowerCase().includes(search.toLowerCase())
    )
  )

}
