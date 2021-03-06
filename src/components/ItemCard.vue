<template>
    <div v-bind:class="getState()" @click.stop.prevent="onClick">
        <div class="item-card__image"><img v-bind:src="item.imageSrc"></div>
        <div class="item-card__info">
            <div class="item-card__name">{{item.name}}</div>
            <div class="item-card__price">
                {{item.price | formatPrice}}
                <span class="item-card__taxable" v-if="item.taxable">taxable</span>
            </div>
        </div>
    </div>
</template>

<script>
import Event from '../core/Event'

export default {
  name: 'ItemCard',
  props: ['item'],
  filters: {
    formatPrice (price) {
      return (parseInt(price) / 100)
        .toLocaleString([], {style: 'currency', currency: 'GBP'})
    }
  },
  methods: {
    /**
     * Get the current state of the card
     * @return {String[]}
     */
    getState () {
      const baseClass = 'item-card'
      const classes = [baseClass]

      if (this.$props.item.availabilityDate > new Date()) {
        classes.push(baseClass + '--pending')
      }

      return classes
    },
    /**
     * Handle card click
     */
    onClick () {
      Event.$emit('StockItem:selected', this.item)
    }
  }
}
</script>

<style lang="scss">
    $fontColor: lighten(black, 10%);
    $cardColour: white;

    .item-card {
        cursor: pointer;
        background-color: $cardColour;
        width: 200px;
        max-width: 200px;
        margin: .5em;
        box-shadow: 0 2px 4px 2px rgba(0, 0, 0, .1);
        transition: all .2s ease-in-out;

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .3);
        }

        &--pending {
            background-color: transparentize($cardColour, .2);

            &:after {
                padding: .5rem;
                font-size: .6em;
                /*font-weight: 100;*/
                display: block;
                content: 'Pending';
                text-transform: uppercase;
                color: $cardColour;
                background-color: transparentize(invert($cardColour), .6);
            }
        }

        &__image {
            height: 200px;
            background-color: #42b983;
        }

        &__info {
            padding: .5em;
            color: $fontColor;
        }

        &__price {
            font-size: .8em;
            color: lighten($fontColor, 20%);
            font-style: italic;
        }

        &__taxable {
            font-size: .8em;
            color: lighten($fontColor, 40%);

            &:before {
                content: '('
            }
            &:after {
                content: ')'
            }
        }
    }
</style>
