<template>
    <div id="layout">
        <vheader :logoSrc="logoSrc"></vheader>
        <main>
            <nuxt/>
        </main>
        <vfooter :text="footerText"></vfooter>
        <div class="back_top" title="返回顶部" v-show="showBackTopBtn" @click="backTop"><span>︿</span></div>
        <div :style="{'background-image': `url(${backdrop})`}" class="bg"></div>
    </div>
</template>

<script>
    import vheader from '~/components/vheader'
    import vfooter from '~/components/vfooter'
    import {domain} from '~/config/qiniu_config'

    export default {
        data() {
            return {
                showBackTopBtn: false
            }
        },
        components: {
            vheader,
            vfooter
        },
        computed: {
            logoSrc() {
                let logo = this.$store.state.individuationData.logo;
                return logo.length ? `${domain}/${logo}-blog_logo` : '';
            },
            backdrop() {
                let backdrop = this.$store.state.individuationData.backdrop;
                return backdrop.length ? `${domain}/${backdrop}-blog_bg` : '';
            },
            footerText() {
                return this.$store.state.individuationData.footer_text;
            }
        },
        mounted() {
            window.addEventListener('scroll', this.switchBackTopBtn);
        },
        methods: {
            backTop() {
                let timer = setInterval(function () {
                    var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                    currentPosition -= 40;
                    if (currentPosition > 0) {
                        window.scrollTo(0, currentPosition);
                    }
                    else {
                        window.scrollTo(0, 0);
                        clearInterval(timer);
                        timer = null;
                    }
                }, 1);
            },
            switchBackTopBtn() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 200) {
                    this.showBackTopBtn = true;
                } else {
                    this.showBackTopBtn = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #layout {
        overflow-x: hidden;
        @media screen and (max-width: 768px) {
            padding-top: 55px;
        }
        main {
            min-height: calc(100vh - 110px);
        }
        .back_top {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 42px;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 10px 25px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
            color: #41b883;
            font-size: 28px;
            cursor: pointer;
            overflow: hidden;
            &:hover {
                span {
                    animation: backTop_animat1 0.3s linear, backTop_animat2 0.3s 0.3s linear;
                }
            }
        }
        .bg {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -99;
            width: 100vw;
            height: 100vh;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
    }

    @keyframes backTop_animat1 {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-42px);
        }
    }

    @keyframes backTop_animat2 {
        0% {
            transform: translateY(42px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
