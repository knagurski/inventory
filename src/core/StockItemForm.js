import StockItem from './StockItem'

class StockItemForm {
  constructor (stockItem = {}) {
    this.setStockItem(stockItem)
  }
  setStockItem (stockItem) {
    this.stockItem = stockItem

    if (stockItem instanceof StockItem) {
      this.name = stockItem.name
      this.description = stockItem.description
      this.price = (parseInt(stockItem.price || 0) / 100).toFixed(2)
      this.availabilityDate = this.getDatePartFromDate(stockItem.availabilityDate)
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
  persist () {
    this.stockItem.name = this.name
    this.stockItem.description = this.description
    this.stockItem.price = parseInt(this.price * 100) || 0
    this.stockItem.availabilityDate = new Date(this.availabilityDate)
    this.stockItem.taxable = !!this.taxable
  }
  getDatePartFromDate (dateObj) {
    return dateObj.toISOString().replace(/T.+$/, '')
  }
}

export default StockItemForm
