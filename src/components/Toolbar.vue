<template>
    <div class="toolbar">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'Toolbar'
  }
</script>

<style lang="scss">
    .toolbar {
        display: flex;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, .5);
        padding: 1em;
        align-items: baseline;
        color: transparentize(white, .6);

        &__section {
            display: flex;
        }
    }
</style>
