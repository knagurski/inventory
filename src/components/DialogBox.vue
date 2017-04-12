<template>
    <div class="dialog">
        <div class="dialog__message">
            <slot></slot>
        </div>
        <toolbar class="dialog__toolbar">
            <slot name="buttons"></slot>
        </toolbar>
    </div>
</template>

<script>
import Toolbar from './Toolbar'

export default {
  name: 'DialogBox',
  components: {Toolbar}
}
</script>

<style lang="scss">
    $bgColor: darken(white, 5%);

    .dialog {
        width: auto;
        max-width: 500px;
        background-color: $bgColor;
        box-shadow: 0 5px 20px 5px transparentize(black, .5);

        &__message {
            padding: 1em;
        }

        &__toolbar {
            justify-content: flex-end;
        }
    }
</style>
