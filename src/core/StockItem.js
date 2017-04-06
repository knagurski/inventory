class StockItem {
  constructor (options = {}) {
    Object.assign(
      this,
      {
        id: Math.floor(Math.random() * 1000),
        name: '',
        description: '',
        price: 100,
        availabilityDate: new Date(),
        taxable: true
      },
      options
    )

    if (!(this.availabilityDate instanceof Date)) {
      this.availabilityDate = new Date(this.availabilityDate)
    }
  }
}

export default StockItem
