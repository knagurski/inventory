<template>
  <div id="app">
    <div class="container" @click="selectedItem = null">
      <sidebar></sidebar>
      <listing :items="itemManager.items"></listing>
    </div>
    <item-form :selectedItem="selectedItem"></item-form>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Listing from './components/Listing'
import ItemForm from './components/ItemForm'
import StockItemManager from './core/StockItemManager'
import StockItem from './core/StockItem'
import Event from './core/Event'

export default {
  name: 'app',
  components: {
    Sidebar,
    Listing,
    ItemForm
  },
  mounted () {
    // start listening for fired events
    Event
      .$on('StockItem:selected', item => {
        this.$data.selectedItem = item
      })
      .$on('StockItem:new', () => {
        this.$data.selectedItem = new StockItem()
      })
      .$on('StockItem:delete', item => {
        this.$data.itemManager.deleteItem(item)
        this.$data.selectedItem = null
      })
      .$on('StockItem:add', item => {
        this.$data.itemManager.addItem(item)
        this.$data.selectedItem = null
      })
      .$on('StockItem:edit', item => {
        this.$data.itemManager.persist()
        this.$data.selectedItem = null
      })
      .$on('StockItem:cancel', () => {
        this.$data.selectedItem = null
      })
      .$on('Fixtures:load', () => {
        this.$data.itemManager.loadFixtures()
      })
  },
  data () {
    return {
      itemManager: new StockItemManager(),
      selectedItem: null
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  #app .container {
    height:100vh;
    width: 100vw;
    display: flex;

    > * {
      flex:1;
    }
  }

  .button {
    background-color: white;
    border:0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    padding: .8em 1em calc(.8em - 3px);
    border-bottom: 3px solid rgba(0,0,0,.3);
    transition: all .1s ease-in-out;

    &[type="submit"] {
      padding-bottom: calc(.8em - 3px);
      border-bottom: 3px solid #42b983;
    }
    &:focus, &:hover {
      box-shadow: 0 3px 6px 2px rgba(0,0,0,.5)
    }
    &:active {
      transform: scale(.95);
    }
  }
</style>
