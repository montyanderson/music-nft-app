export default {
	async getUSD() {
		const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");

		const { USD } = await response.json();

		return USD;
	}
};