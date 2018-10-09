<template>
    <approved />
</template>

<script>

    import OrderApproved from './../../../shareds/statistics/box/OrderApproved'

    export default {
        components: {
            'approved': OrderApproved,
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
