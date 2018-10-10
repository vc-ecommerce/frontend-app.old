<template>

    <statistic color="yellow" :sizeColSM="6">
        <div>
            <div class="number">05</div>
            <div class="caption">
                <div>Pedidos feitos nos últimos 30 dias</div>
            </div>
        </div>
    </statistic>

</template>

<script>

    import Statistic from './../../../../../shareds/StatisticBoxHelper'

    export default {
        components: {
            'statistic': Statistic
        },
        props: [],
        mounted() {

        },
        data() {
            return {}
        },
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>
