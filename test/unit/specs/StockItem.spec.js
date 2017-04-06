import StockItem from '@/core/StockItem'

describe('StockItem', () => {
  const getNewStockItem = function () {
    return new StockItem(...arguments)
  }

  it('should default to empty values', () => {
    const item = getNewStockItem()

    expect(item.name).to.be.empty
    expect(item.description).to.be.empty
    expect(item.price).to.equal(0)
    expect(item.availabilityDate).to.be.a('Date')
    expect(item.taxable).to.be.true
  })

  it('should set values via the constructor', () => {
    const name = 'name'
    const description = 'description'
    const price = 12300
    const availabilityDate = new Date().setYear(new Date().getYear() + 1)
    const taxable = false

    const item = getNewStockItem(
      name,
      description,
      price,
      availabilityDate,
      taxable
    )

    expect(item.name).to.equal(name)
    expect(item.description).to.equal(description)
    expect(item.price).to.equal(price)
    expect(item.availabilityDate).to.equal(availabilityDate)
    expect(item.taxable).to.equal(taxable)
  })
})
