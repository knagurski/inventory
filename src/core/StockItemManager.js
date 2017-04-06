import StockItem from './StockItem'

class StockItemManager {
  constructor (storage = localStorage) {
    this.storage = storage
    this.items = this.load()
  }
  getItems () {
    return this.items
  }
  addItem (item) {
    this.items.push(item)
    this.items.sort((itemA, itemB) => itemA.name > itemB.name ? 1 : -1)
    this.persist()

    return this
  }
  deleteItem (item) {
    this.items.splice(this.items.indexOf(item), 1)
    this.persist()

    return this
  }
  persist () {
    this.storage.setItem('StockItems', JSON.stringify(this.items))

    return this
  }
  load () {
    if (this.storage.getItem('StockItems')) {
      return JSON.parse(this.storage.getItem('StockItems'))
        .map(item => new StockItem(item))
    }

    return []
  }
}

export default StockItemManager
