<template>
    <section class="listing">
        <div class="listing__item-wrapper">
            <item-card v-for="item in items" :item="item" :key="item.id"></item-card>
        </div>
        <div class="listing__toolbar">
            <div class="listing__toolbar-count">{{items.length}}</div>
        </div>
    </section>
</template>

<script>
import ItemCard from './ItemCard.vue'

export default {
  name: 'Listing',
  props: ['items'],
  components: {
    ItemCard
  }
}
</script>

<style lang="scss">
    section.listing {
        background: lighten(rgb(0,0,0), 30%);
        display: flex;
        flex-direction: column;
    }
    .listing__item-wrapper {
        display: flex;
        flex-wrap: wrap;
        padding: .5em;
        /*flex: 1;*/
        overflow: auto;
    }
    .listing__toolbar {
        /*background-color: lighten(black, 10%);*/
    }
</style>
