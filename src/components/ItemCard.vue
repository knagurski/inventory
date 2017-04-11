<template>
    <div class="item-card" v-bind:class="state" @click.stop.prevent="onClick">
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
  computed: {
    state () {
      const states = {}

      if (this.$props.item.availabilityDate > new Date()) {
        states['item-card--pending'] = true
      }

      return states
    }
  },
  filters: {
    formatPrice (price) {
      return (parseInt(price) / 100)
        .toLocaleString([], {style: 'currency', currency: 'GBP'})
    }
  },
  methods: {
    onClick () {
      Event.$emit('StockItem:selected', this.item)
    }
  }
}
</script>

<style lang="scss">
    $fontColor: lighten(rgb(0,0,0), 10%);
    $cardColour: rgba(255,255,255,1);

    .item-card {
        cursor: pointer;
        background-color: rgba(255,255,255,1);
        width: 200px;
        max-width: 200px;
        margin: .5em;
        box-shadow: 0 2px 4px 2px rgba(0,0,0,.1);
        transition: all .2s ease-in-out;

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 2px 10px 5px rgba(0,0,0,.3);
        }
    }

    .item-card--pending {
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
        background-color: transparentize($cardColour, .2);
    }

    .item-card__image {
        height:200px;
        background-color: #42b983;
    }
    .item-card__info {
        padding: .5em;
        color: $fontColor;
    }
    .item-card__price {
        font-size: .8em;
        color: lighten($fontColor, 20%);
        font-style: italic;
    }

    .item-card__taxable {
        font-size: .8em;
        color: lighten($fontColor, 40%);

        &:before {
            content: '('
        }
        &:after {
            content: ')'
        }
    }
</style>
