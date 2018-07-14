<template>
    <div id="layout" :style="{'background-image': `url(${backdrop})`}">
        <vheader :logoSrc="logoSrc"></vheader>
        <main style="min-height: calc(100vh - 120px);">
            <nuxt/>
        </main>
        <vfooter :text="footerText"></vfooter>
        <div class="back_top" title="返回顶部" v-show="showBackTopBtn" @click="backTop">
            <i class="el-icon-arrow-up"></i>
        </div>
    </div>
</template>

<script>
    import vheader from '~/components/vheader'
    import vfooter from '~/components/vfooter'
    import {domain} from '~/config/qiniu_config'

    export default {
        data() {
            return {
                logoSrc: '',
                backdrop: '',
                footerText: {},
                showBackTopBtn: false
            }
        },
        components: {
            vheader,
            vfooter
        },
        mounted() {
            this.$axios.$get('/api/individuation/getIndividuation').then((res) => {
                if (res.code === 200) {
                    this.logoSrc = res.data.logo.length ? `${domain}/${res.data.logo}-blog_logo` : '';
                    this.backdrop = res.data.backdrop.length ? `${domain}/${res.data.backdrop}-blog_bg` : '';
                    this.footerText = res.data.footer_text;
                }
            });
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
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        overflow-x: hidden;
        @media screen and (max-width: 768px) {
            padding-top: 60px;
        }
        .back_top {
            position: fixed;
            right: 24px;
            bottom: 24px;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
            color: #41b883;
            font-size: 28px;
            cursor: pointer;
            overflow: hidden;
            &:hover {
                i {
                    animation: backTop_animat1 0.3s linear, backTop_animat2 0.3s 0.3s linear;
                }
            }
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
