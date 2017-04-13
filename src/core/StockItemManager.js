import StockItem from './StockItem'

/**
 * Generate a random lorempixel image url
 *
 * @param {String} itemName
 * @return {String}
 */
function getRandomImageUrl (itemName) {
  const sections = ['business', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport']
  const randomSection = sections[Math.floor(Math.random() * sections.length)]

  return `//lorempixel.com/200/200/${randomSection}/${encodeURI(itemName)}`
}

class StockItemManager {
  /**
   * Constructor
   * @param {Storage} storage
   */
  constructor (storage = localStorage) {
    this.storage = storage
    this.items = this.load()
  }

  /**
   * Get all items
   * @return {StockItem[]}
   */
  getItems () {
    return this.items
  }

  /**
   * Add a new item
   * @param {StockItem} item
   * @return {StockItemManager}
   */
  addItem (item) {
    this.items.push(item)
    this.items.sort((itemA, itemB) => {
      return itemA.name.toLowerCase() > itemB.name.toLowerCase() ? 1 : -1
    })

    // ID would come from the server
    item.id = Math.floor(Math.random() * 1000)
    // images are beyond the scope, so for now we'll generate a random SRC
    item.imageSrc = getRandomImageUrl(item.name)

    this.persist()

    return this
  }

  /**
   * Delete an item
   * @param {StockItem} item
   * @return {StockItemManager}
   */
  deleteItem (item) {
    this.items.splice(this.items.indexOf(item), 1)
    this.persist()

    return this
  }

  /**
   * Send the current list of items to the storage
   * @return {StockItemManager}
   */
  persist () {
    this.storage.setItem('StockItems', JSON.stringify(this.items))

    return this
  }

  /**
   * Load items from the storage
   * @return {StockItem[]}
   */
  load () {
    if (this.storage.getItem('StockItems')) {
      // recover items from the storage and re-hydrate them into StockItem objects
      return JSON.parse(this.storage.getItem('StockItems'))
        .map(item => new StockItem(item))
    }

    return []
  }

  /**
   * Load fixtures over AJAX
   * @return {Promise}
   */
  loadFixtures () {
    return fetch('/static/fixtures.json')
      .then(res => res.json())
      .then(items => {
        // hydrate and load each item
        items.map(item => new StockItem(item))
          .forEach(this.addItem.bind(this))
      })
  }
}

export default StockItemManager
