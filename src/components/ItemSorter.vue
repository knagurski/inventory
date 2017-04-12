<template>
    <div class="item-sorter">
        <button v-bind:class="getButtonState('name')" @click="reorder('name')">Name</button>
        <button v-bind:class="getButtonState('price')" @click="reorder('price')">Price</button>
    </div>
</template>

<script>
import Event from '../core/Event'

export default {
  name: 'ItemSorter',
  props: ['orderAscending', 'orderBy'],
  methods: {
    getButtonState (btnType) {
      const baseClass = 'item-sorter__button'
      const classes = [baseClass]

      if (btnType === this.$props.orderBy) {
        classes.push(baseClass + '--selected')
        classes.push(baseClass + (this.$props.orderAscending ? '--ascending' : '--descending'))
      }

      return classes
    },
    reorder (btnType) {
      if (btnType === this.$props.orderBy) {
        Event.$emit('Listing:orderAscending', !this.$props.orderAscending)
      } else {
        Event.$emit('Listing:orderAscending', true)
        Event.$emit('Listing:orderBy', btnType)
      }
    }
  }
}
</script>

<style lang="scss">
    .item-sorter__button {
        &--selected {
            background: hotpink !important;
        }
        &--ascending {
            &:before {
                content: 'ASC ';
            }
        }
        &--descending {
            &:before {
                content: 'DESC ';
            }
        }
    }
</style>
