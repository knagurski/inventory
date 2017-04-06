<template>
    <form class="item-form">
        <div class="form">
            <label for="item-name">Name</label>
            <input type="text" id="item-name" v-model="stockItemForm.name" required/>
            <label for="item-description">Description</label>
            <textarea id="item-description" v-model="stockItemForm.description" required></textarea>
            <label for="item-price">Price</label>
            <input type="number" id="item-price" v-model.number="stockItemForm.price" required/>
            <label for="item-availability-date">Date available</label>
            <input type="date" id="item-availability-date" v-model="stockItemForm.availabilityDate" required/>
            <label for="item-taxable">Taxable?</label>
            <input type="checkbox" id="item-taxable" v-model="stockItemForm.taxable"/>
        </div>
        <div class="toolbar">
            <button class="item-form__save" type="submit" @click.prevent.stop="persist">Save</button>
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
      Event.$emit('StockItem:edit', this.$props.selectedItem)
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
        width: 500px;
        position: absolute;
        top:0;
        right: 0;
        background-color: hotpink;
        box-shadow: -3px 1px 16px 5px rgba(0,0,0,.5);
        transform: translateX(100%);
        opacity: 0;
        transition: all .3s ease-in-out;
    }

    .item-form--show .item-form {
        opacity: 1;
        transform: translateX(0);
    }
</style>
