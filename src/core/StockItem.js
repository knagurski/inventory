class StockItem {
  /**
   * Constructor
   * @param {Object} options
   */
  constructor (options = {}) {
    Object.assign(
      this,
      {
        id: null,
        imageSrc: '',
        name: '',
        description: '',
        price: 100,
        availabilityDate: new Date(),
        taxable: true
      },
      options
    )

    // if the date isn't a Date object, create one
    if (!(this.availabilityDate instanceof Date)) {
      this.availabilityDate = new Date(this.availabilityDate)
    }
  }
}

export default StockItem
