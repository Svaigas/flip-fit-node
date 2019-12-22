export default async function exchangePrice(price, currency) {
  const rate = await request('https://api.exchangeratesapi.io/latest')
      .then(function(data) {
        const parsedBody = JSON.parse(data)
        return parsedBody.rates[currency]
      })
      .catch((err) => err)
  return {
    exchangedPrice: rate ? price * rate : price,
    exchangedCurrency: rate ? currency : 'EUR'
  }
}
