<template>
    <div :class="{fixed: isFixed, right_side: true}">
        <business-card></business-card>
        <label-list></label-list>
        <recommend></recommend>
    </div>
</template>

<script>
    import businessCard from '~/components/businessCard'
    import recommend from '~/components/recommend'
    import labelList from '~/components/labelList'

    export default {
        name: "rightSide",
        components: {
            businessCard,
            recommend,
            labelList
        },
        data() {
            return {
                isFixed: false,
                offsetTop: ''
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollFixed);
        },
        methods: {
            scrollFixed() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (this.offsetTop === '' && document.querySelector('.right_side') && document.querySelector('.right_side').style.display !== 'none') {
                    this.offsetTop = document.querySelector('.right_side').offsetTop;
                }
                this.isFixed = scrollTop > this.offsetTop;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .right_side {
        width: 30%;
        &.fixed {
            position: fixed;
            top: 12px;
            @media screen and (min-width: 1200px) {
                width: calc(1200px * 0.3 - 6px);
                margin-left: calc(1200px * 0.7 - 14px);
            }
            @media screen and (min-width: 1024px) and (max-width: 1200px) {
                width: calc(1024px * 0.3 - 6px);
                margin-left: calc(1024px * 0.7 - 14px);
            }
            @media screen and (min-width: 992px) and (max-width: 1024px) {
                width: calc(992px * 0.3 - 6px);
                margin-left: calc(992px * 0.7 - 14px);
            }
        }
    }

    @media screen and (max-width: 992px) {
        .right_side {
            display: none;
        }
    }
</style>
