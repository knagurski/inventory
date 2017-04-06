<template>
    <section class="sidebar">
        This is the sidebar
        <button type="button" @click.stop="add">Add</button>
    </section>
</template>

<script>
import Event from '../core/Event'

export default {
  name: 'Sidebar',
  methods: {
    add () {
      Event.$emit('StockItem:new')
    }
  }
}
</script>

<style lang="scss">
    section.sidebar {
        width: 80px;
        max-width: 80px;
        background: lighten(rgb(0,0,0), 10%);
        color: white;
    }
</style>
