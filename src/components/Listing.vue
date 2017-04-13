<template>
    <section v-bind:class="getState()">
        <dialog-box v-if="items.length < 1">
            <p>Whoops, looks like you're a little light on stock items. Would you like
            me to load a few sample ones for you?</p>

            <div slot="buttons">
                <button class="button" @click="loadFixtures">Yes please</button>
            </div>
        </dialog-box>
        <template v-else>
            <div class="listing__items">
                <div class="listing__items-wrapper">
                    <item-card v-for="item in filteredItems"
                               :item="item"
                               :key="item.id"></item-card>
                </div>
            </div>
            <toolbar>
                <div class="listing__total">
                    <template v-if="filteredItems.length != items.length">
                        {{ filteredItems.length }} of
                    </template>
                    {{ items.length }} Stock Items
                </div>

                <div class="toolbar__section">
                    <item-sorter :orderAscending="orderAscending"
                                 :orderBy="orderBy"></item-sorter>
                    <input class="listing__filter" type="search"
                           v-model="searchTerm" placeholder="Find item">
                </div>
            </toolbar>
        </template>
    </section>
</template>

<script>
import ItemCard from './ItemCard'
import Toolbar from './Toolbar'
import ItemSorter from './ItemSorter'
import DialogBox from './DialogBox'
import Event from '../core/Event'

export default {
  name: 'Listing',
  props: ['items'],
  data () {
    return {
      orderAscending: true,
      orderBy: 'name',
      searchTerm: ''
    }
  },
  mounted () {
    // listen for ordering events
    Event
      .$on('Listing:orderAscending', orderAsc => {
        this.$data.orderAscending = orderAsc
      })
      .$on('Listing:orderBy', orderBy => {
        this.$data.orderBy = orderBy
      })
  },
  components: {
    DialogBox,
    ItemSorter,
    Toolbar,
    ItemCard
  },
  computed: {
    filteredItems () {
      const term = this.$data.searchTerm.toLowerCase()

      // filter the items based on the search term
      const filteredItems = this.$props.items.filter(item => {
        return !term || item.name.toLowerCase().indexOf(term) > -1
      })

      // order by name or price
      if (this.$data.orderBy === 'name') {
        filteredItems.sort(this.sortByName)
      } else if (this.$data.orderBy === 'price') {
        filteredItems.sort(this.sortByPrice)
      }

      // if order ascending is false reverse the order
      if (!this.$data.orderAscending) {
        filteredItems.reverse()
      }

      return filteredItems
    }
  },
  methods: {
    /**
     * Sort by price
     * @param {StockItem} itemA
     * @param {StockItem} itemB
     * @return {number}
     */
    sortByPrice (itemA, itemB) {
      if (itemA.price === itemB.price) {
        return 0
      }
      return itemA.price > itemB.price ? 1 : -1
    },
    /**
     * Sort by name
     * @param {StockItem} itemA
     * @param {StockItem} itemB
     * @return {number}
     */
    sortByName (itemA, itemB) {
      if (itemA.name.toLowerCase() === itemB.name.toLowerCase()) {
        return 0
      }

      return itemA.name.toLowerCase() > itemB.name.toLowerCase() ? 1 : -1
    },
    /**
     * Load fixtures over AJAX
     */
    loadFixtures () {
      Event.$emit('Fixtures:load')
    },
    /**
     * Get the current state
     * @return {String[]}
     */
    getState () {
      const baseClass = 'listing'
      const classes = [baseClass]

      if (this.$props.items.length < 1) {
        classes.push(baseClass + '--no-items')
      }

      return classes
    }
  }
}
</script>

<style lang="scss">
    .listing {
        background: lighten(rgb(0, 0, 0), 30%);
        display: flex;
        flex-direction: column;

        &--no-items {
            justify-content: center;
            align-items: center;
        }

        &__items {
            flex: 1;
            overflow: auto;
        }

        &__items-wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: .5em;
        }

        &__filter {
            padding: .5em 1em;
            border: none;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
            border-radius: 2em;
            font-family: inherit;
            font-size: .8em;
            transform: scale(.995);
            transition: all .1s ease-in-out;

            &:focus {
                box-shadow: 0 3px 6px 2px rgba(0, 0, 0, .5);
                transform: scale(1);
                outline: none;
            }
        }
    }
</style>
