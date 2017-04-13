import StockItem from './StockItem'

class StockItemForm {
  /**
   * Constructor
   * @param {StockItem} stockItem
   */
  constructor (stockItem = {}) {
    this.setStockItem(stockItem)
  }

  /**
   * Set the current item to edit
   * @param {StockItem} stockItem
   */
  setStockItem (stockItem) {
    this.stockItem = stockItem

    // if a stock item was passed, use its data
    if (stockItem instanceof StockItem) {
      this.name = stockItem.name
      this.description = stockItem.description
      // transform the integer representation to a 2 decimal place string
      this.price = (parseInt(stockItem.price || 0) / 100).toFixed(2)
      // transform the date object to only be the date portion
      this.availabilityDate = this.getDatePartFromDate(stockItem.availabilityDate)
      // make sure we have a boolean
      this.taxable = !!stockItem.taxable
    } else {
      Object.assign(
        this,
        {
          name: '',
          description: '',
          price: 0.00,
          availabilityDate: this.getDatePartFromDate(new Date()),
          taxable: true
        }
      )
    }
  }

  /**
   * Save the form values back into the target stock item
   */
  persist () {
    this.stockItem.name = this.name
    this.stockItem.description = this.description
    // transform back from the 2 decimal place string to an integer
    this.stockItem.price = parseInt(this.price * 100) || 0
    this.stockItem.availabilityDate = new Date(this.availabilityDate)
    this.stockItem.taxable = !!this.taxable
  }

  /**
   * Get just the date portion of a Date object
   * @param {Date} dateObj
   * @return {String}
   */
  getDatePartFromDate (dateObj) {
    return dateObj.toISOString().replace(/T.+$/, '')
  }
}

export default StockItemForm
