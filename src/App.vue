<template>
  <div id="app" v-bind:class="getState">
    <div class="container" @click="selectedItem = null">
      <sidebar></sidebar>
      <listing :items="itemManager.items"></listing>
    </div>
    <item-form :selectedItem="selectedItem"></item-form>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Listing from './components/Listing.vue'
import ItemForm from './components/ItemForm.vue'
import StockItemManager from './core/StockItemManager'
import Event from './core/Event'

export default {
  name: 'app',
  components: {
    Sidebar,
    Listing,
    ItemForm
  },
  mounted () {
    Event
      .$on('StockItem:selected', item => {
        this.$data.selectedItem = item
      })
      .$on('StockItem:delete', item => {
        this.$data.itemManager.deleteItem(item)
      })
      .$on('StockItem:add', item => {
        this.$data.itemManager.addItem(item)
      })
      .$on('StockItem:edit', item => {
        this.$data.itemManager.persist()
        this.$data.selectedItem = null
      })
  },
  computed: {
    getState () {
      const state = {}

      if (this.$data.selectedItem) {
        state['item-form--show'] = true
      }

      return state
    }
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
    font-family: Helvetica Neue, Helvetica, Arial;
  }

  #app .container {
    height:100vh;
    width: 100vw;
    display: flex;

    > * {
      flex:1;
    }
  }
</style>
