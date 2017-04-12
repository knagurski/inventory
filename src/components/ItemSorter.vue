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
    $activeColor: #42b983;
    $inactiveColor: darken(white, 10%);

    .item-sorter {
        display: flex;
        margin: 0 .5em;
        border-radius: 2em;
        box-shadow: 0 3px 6px 2px rgba(0,0,0,.5);

        &__button {
            padding: .5em 1.5em;
            margin:0;
            border: none;
            background-color: $inactiveColor;
            transition: all .3s ease-in-out;

            &:focus {
                background-color: lighten($inactiveColor, 20%);
                outline: none;
            }

            &:first-child {
                border-radius: 2em 0 0 2em;
                padding-left:2em;
            }
            &:last-child {
                border-radius: 0 2em 2em 0;
                padding-right: 2em;
            }

            &--selected {
                background: $activeColor;

                &:focus {
                    background-color: lighten($activeColor, 5%);
                }
            }

            &:before {
                content: '▲';
                display: inline-block;
                font-size: .9em;
                width: 1em;
                margin-left: -1em;
                opacity:0;
                transition: all .3s ease-in-out;
                line-height: 1;
                color:darken($activeColor, 10%);
            }

            &--ascending, &--descending {
                &:before {
                    opacity: 1;
                }
            }
            &--descending:before {
                transform: rotate(180deg);
            }
        }
    }
</style>
