<template>
    <form class="item-form" @submit.prevent="persist">
        <div class="item-form__wrapper">
            <label for="item-name">Name</label>
            <input type="text" id="item-name" v-model="stockItemForm.name" required/>
            <label for="item-description">Description</label>
            <textarea id="item-description" v-model="stockItemForm.description" required></textarea>
            <label for="item-price">Price</label>
            <div class="item-form__price-wrapper">
                <abbr title="GBP">£</abbr>
                <input type="number" id="item-price" v-model.number="stockItemForm.price" required class="item-form__price" step=".01"/>
            </div>
            <label for="item-availability-date">Date available</label>
            <input type="date" id="item-availability-date" v-model="stockItemForm.availabilityDate" required/>
            <label for="item-taxable">Taxable?</label>
            <input type="checkbox" id="item-taxable" v-model="stockItemForm.taxable"/>
        </div>
        <div class="toolbar">
            <div class="toolbar__section">
                <button v-if="selectedItem && selectedItem.id" class="item-form__delete" type="button" @click="deleteItem">Delete</button>
            </div>
            <div class="toolbar__section">
                <button class="item-form__cancel" type="button" @click="cancel">Cancel</button>
                <button class="item-form__save" type="submit">Save</button>
            </div>
        </div>
    </form>
</template>

<script>
import Event from '../core/Event'
import StockItemForm from '../core/StockItemForm'

const stockItemForm = new StockItemForm()

export default {
  name: 'ItemForm',
  props: ['selectedItem'],
  watch: {
    selectedItem: function (newStockItem) {
      stockItemForm.setStockItem(newStockItem)
    }
  },
  methods: {
    persist () {
      stockItemForm.persist()

      if (this.$props.selectedItem.id) {
        Event.$emit('StockItem:edit', this.$props.selectedItem)
      } else {
        Event.$emit('StockItem:add', this.$props.selectedItem)
      }
    },
    cancel () {
      Event.$emit('StockItem:cancel')
    },
    deleteItem () {
      if (confirm('Are you really sure you want to delete this?')) {
        Event.$emit('StockItem:delete', this.$props.selectedItem)
      }
    }
  },
  data () {
    return {
      stockItemForm
    }
  }
}
</script>

<style lang="scss">
    .item-form {
        height: 100vh;
        width: 100vw;
        /*width: 600px;*/
        position: absolute;
        top:0;
        right: 0;
        background-color: rgba(44,62,80,.95);
        box-shadow: -3px 1px 16px 5px rgba(0,0,0,.5);
        transform: translateX(100%);
        opacity: 0;
        transition: all .3s ease-in-out;
        color: white;
        display: flex;
        flex-direction: column;
    }

    .item-form__wrapper {
        flex: 1;
        margin: 1.5em;
        width: 500px;
        align-self: center;

        label {
            display: block;
            font-weight: 200;
            margin: 1em 0 .5em;
        }

        input:not([type="checkbox"]), textarea {
            width: 100%;
            padding: 1em;
            border: none;
            margin-bottom: 1em;
            box-shadow: 0 1px 2px rgba(0,0,0,.5);
            font-family: inherit;
            font-size: .8em;
            transform: scale(.995);
            transition:all .1s ease-in-out;

            &:focus {
                box-shadow: 0 3px 6px 2px rgba(0,0,0,.5);
                transform: scale(1);
                outline: none;
            }
            &:valid {
                border-right:1em solid lawngreen;
            }

            &:invalid {
                border-right: 1em solid orange;
            }
        }

        .item-form__price-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 1em;

            input {
                margin-bottom: 0;
            }
            abbr {
                font-size: 1.1em;
                font-weight: 200;
                margin-right: .5em;
            }
        }

        textarea {
            height: 10em;
        }
    }

    button.item-form__delete {
        border-bottom-color: orange;
    }

    .item-form--show .item-form {
        opacity: 1;
        transform: translateX(0);
    }
</style>
