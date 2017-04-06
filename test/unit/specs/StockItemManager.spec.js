import StockItemManager from '@/core/StockItemManager'
import StockItem from '@/core/StockItem'

describe('StockItemManager', () => {
  beforeEach(function () {
    StockItemManager.items = []
  })

  it('starts off as empty', done => {
    const getItems = StockItemManager.getItems()

    expect(getItems).to.be.a.promise
    getItems
      .then(items => {
        expect(items).to.be.empty
        done()
      })
      .catch(err => done(err))
  })

  it('can add an item', done => {
    const newItem = new StockItem('test')
    const addItem = StockItemManager.addItem(newItem)

    addItem
      .then(manager => {
        manager.getItemByName(newItem.name)
          .then(item => {
            expect(item).to.equal(newItem)
            done()
          })
          .catch(done)
      })
  })
})
