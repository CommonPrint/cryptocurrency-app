const BASE_URL = 'http://localhost:4000/crypto-list';

export const ALL_COINS = BASE_URL;

export const searchByCoin = (cryptoCoin: string) => BASE_URL + '/' + cryptoCoin;