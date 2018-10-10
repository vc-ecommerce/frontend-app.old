<template>
    <box-panel title="Contatos Recentes">
        <div class="contact-row-list">
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-2.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Tim Collins</a></p>
                            <p class="user-card-row-mail"><a href="#">timcolins@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">Director at Tony’s</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-1.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Maggy Smith</a></p>
                            <p class="user-card-row-mail"><a href="#">maggysmith@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">PR Manager</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-3.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Molly Bridjet</a></p>
                            <p class="user-card-row-mail"><a href="#">mollybr@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">Assistan</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-4.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Maggy Smith</a></p>
                            <p class="user-card-row-mail"><a href="#">maggysmith@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">PR Manager</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-2.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Tim Collins</a></p>
                            <p class="user-card-row-mail"><a href="#">timcolins@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">Director at Tony’s</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-1.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Maggy Smith</a></p>
                            <p class="user-card-row-mail"><a href="#">maggysmith@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">PR Manager</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-3.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Molly Bridjet</a></p>
                            <p class="user-card-row-mail"><a href="#">mollybr@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">Assistan</div>
                    </div>
                </div>
            </article>
            <article class="contact-row">
                <div class="user-card-row">
                    <div class="tbl-row">
                        <div class="tbl-cell tbl-cell-photo">
                            <a href="#">
                                <img src="img/photo-64-4.jpg" alt="">
                            </a>
                        </div>
                        <div class="tbl-cell">
                            <p class="user-card-row-name"><a href="#">Maggy Smith</a></p>
                            <p class="user-card-row-mail"><a href="#">maggysmith@mail.com</a></p>
                        </div>
                        <div class="tbl-cell tbl-cell-status">PR Manager</div>
                    </div>
                </div>
            </article>
        </div>
    </box-panel>
</template>

<script>
    import BoxTypical from './../../../../shareds/BoxTypicalPanelHelper';

    export default {
        components: {
            'box-panel': BoxTypical
        },
        props: [],
        mounted() {

            $(document).ready(function () {

                $('.panel').each(function () {
                    try {
                        $(this).lobiPanel({
                            sortable: true
                        }).on('dragged.lobiPanel', function (ev, lobiPanel) {
                            $('.dahsboard-column').matchHeight();
                        });
                    } catch (err) {
                    }
                });

            });

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
