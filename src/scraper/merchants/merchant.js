export default class Merchant {
  constructor(url) {
    this.url = url;
  }

  scrape(url) {
    return {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: null,
      scrapedWithoutErrors: true
    }
  }
}
