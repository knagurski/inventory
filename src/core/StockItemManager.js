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
  constructor (storage = localStorage) {
    this.storage = storage
    this.items = this.load()
  }
  getItems () {
    return this.items
  }
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
  loadFixtures () {
    return fetch('/static/fixtures.json')
      .then(res => res.json())
      .then(items => {
        items.forEach(item => this.addItem(item))
      })
  }
}

export default StockItemManager
