import StockItemManager from '@/core/StockItemManager'
import StockItem from '@/core/StockItem'

describe('StockItemManager', () => {
  const getNewStockItem = function () {
    return new StockItem(...arguments)
  }

  const getNewStockItemManager = function () {
    return new StockItemManager(sessionStorage)
  }

  beforeEach(() => {
    sessionStorage.clear()
  })

  it('starts off as empty', () => {
    const manager = getNewStockItemManager()

    expect(manager.items).to.be.an.array
    expect(manager.items).to.be.empty
  })

  it('can add an item', () => {
    const manager = getNewStockItemManager()
    const item = getNewStockItem()

    expect(manager.items).to.be.empty

    manager.addItem(item)

    expect(manager.items).to.not.be.empty
    expect(manager.items).to.be.length(1)
    expect(manager.items).to.contain(item)
  })

  it('can delete an item', () => {
    const manager = getNewStockItemManager()
    const item = getNewStockItem()
    manager.addItem(item)

    expect(manager.items).to.contain(item)

    manager.deleteItem(item)

    expect(manager.items).to.not.contain(item)
  })
})
