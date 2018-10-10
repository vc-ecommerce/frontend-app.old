<template>
    <div :class="defineSizeSM">
        <article class="statistic-box" :class="color">
            <slot></slot>
        </article>
    </div>

</template>

<script>
    export default {
        props: {
            color: {
                type: String
            },
            sizeColSM: {
                type: Number,
                default: 6
            }
        },
        mounted() {

        },
        data() {
            return {}
        },
        methods: {},
        computed: {
            defineSizeSM() {
                return 'col-sm-' + this.sizeColSM;
            }
        }
    }
</script>

<style scoped>
    .statistic-box {
        color: #fff;
    }
</style>