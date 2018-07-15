<template>
    <header>
        <div class="container clearfix">
            <div class="mobile-nav-btn tl">
                <i class="iconfont icon-im_fenlei" style="font-size: 22px;" @click="openMobileNav"></i>
            </div>
            <div class="logo tc">
                <nuxt-link :to="{path: '/'}"><img :src="logoSrc" title="首页"></nuxt-link>
            </div>
            <nav class="navbar">
                <nuxt-link :to="{path: '/'}">首页</nuxt-link>
                <nuxt-link :to="{path: '/diary'}">随记</nuxt-link>
                <nuxt-link :to="{path: '/news'}">新闻</nuxt-link>
                <nuxt-link :to="{path: '/about'}">关于</nuxt-link>
            </nav>
            <div class="search tr">
                <input type="text" class="search-input" placeholder="搜索文章" v-model="searchContent" @keyup.enter="searchArticle">
                <i class="iconfont icon-im_sousuo_a" style="font-size: 18px;" @click="searchArticle"></i>
            </div>
            <div class="mobile-search-btn tr">
                <i class="iconfont icon-im_sousuo_a" style="font-size: 22px;" @click="showMobileSearchInput = !showMobileSearchInput"></i>
            </div>
        </div>

        <transition name="slide-down">
            <div v-show="showMobileSearchInput" class="mobile-search-input">
                <input type="text" class="search-input" placeholder="搜索文章" v-model="searchContent" @keyup.enter="searchArticle">
                <i class="iconfont icon-ln_quxiao" @click="showMobileSearchInput = !showMobileSearchInput"></i>
            </div>
        </transition>

        <transition name="slide-left">
            <mobileNav v-show="showMobileNav"></mobileNav>
        </transition>
        <transition name="fade-in">
            <div class="mask" v-show="showMobileNav" @click="closeMobileNav" @touchmove.prevent></div>
        </transition>
    </header>
</template>

<script>
    import mobileNav from '~/components/mobileNav'
    import {domain} from '~/config/qiniu_config'

    export default {
        name: "vheader",
        props: ['logoSrc'],
        data() {
            return {
                showMobileNav: false,
                showMobileSearchInput: false,
                searchContent: ''
            }
        },
        components: {
            mobileNav
        },
        watch: {
            $route: function () {
                this.showMobileNav = false;
                this.banSlide(false);
            }
        },
        methods: {
            searchArticle() {
                if (this.searchContent.trim() !== '') {
                    this.$router.push({
                        path: '/list/searchArticle/' + this.searchContent.trim()
                    });
                    this.showMobileSearchInput = false;
                    this.searchContent = '';
                }
            },
            openMobileNav() {
                this.showMobileNav = true;
                this.banSlide(true);
            },
            closeMobileNav() {
                this.showMobileNav = false;
                this.banSlide(false);
            },
            banSlide(flag) {
                if (flag) {
                    document.querySelector('html').style.overflowY = 'hidden';
                    document.querySelector('body').style.overflowY = 'hidden';
                } else {
                    document.querySelector('html').style.overflowY = 'auto';
                    document.querySelector('body').style.overflowY = 'auto';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: transform 0.3s;
    }

    .slide-down-enter, .slide-down-leave-to {
        transform: translateY(-60px);
    }

    .slide-left-enter-active, .slide-left-leave-active {
        transition: transform 0.3s;
    }

    .slide-left-enter, .slide-left-leave-to {
        transform: translateX(-100vw);
    }

    .fade-in-enter-active, .fade-in-leave-active {
        transition: opacity 0.3s;
    }

    .fade-in-enter, .fade-in-leave-to {
        opacity: 0;
    }

    header {
        height: 55px;
        line-height: 40px;
        padding: 10px 0;
        background-color: rgba(255, 255, 255, .95);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        .container {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > div, & > nav {
                height: 100%;
            }
        }
        .mobile-nav-btn {
            width: 20%;
        }
        .logo {
            width: 20%;
            font-size: 0;
            padding: 5px 0;
            a, img {
                display: inline-block;
                vertical-align: top;
                height: 100%;
                img {
                    transition: 1s;
                    &:hover {
                        transform: rotateY(360deg);
                    }
                }
            }
        }
        .navbar {
            width: 50%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            a {
                padding: 0 20px;
                transition: 0.4s;
                &:hover {
                    color: #41b883;
                }
                &.nuxt-link-exact-active {
                    color: #41b883;
                    border-bottom: 1px solid #41b883;
                }
            }
        }
        .search {
            position: relative;
            top: 0;
            left: 0;
            width: 30%;
            padding-left: 30px;
            font-size: 0;
            .search-input {
                width: 100%;
                height: 100%;
                padding: 0 40px 0 6px;
                font-size: 14px;
                &:focus {
                    border-color: #41b883;
                }
            }
            .iconfont {
                position: absolute;
                top: 0;
                right: 10px;
                cursor: pointer;
                &:hover {
                    color: #41b883;
                }
            }
        }
        .mobile-search-btn {
            width: 20%;
        }
        .mobile-search-input {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 10px;
            width: 100%;
            height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            .search-input {
                width: 90%;
                height: 40px;
                line-height: 36px;
                font-size: 14px;
            }
            i {
                font-size: 22px;
                padding-left: 10px;
            }
        }
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
        }
    }

    @media screen and (max-width: 768px) {
        header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            .container {
                padding: 0 10px;
            }
            .logo {
                width: 60%;
            }
            .navbar {
                display: none;
            }
            .search {
                display: none;
            }
        }
    }

    @media screen and (min-width: 768px) {
        header {
            .mobile-nav-btn {
                display: none;
            }
            .logo {
                text-align: left;
            }
            .mobile-search-btn {
                display: none;
            }
            .mask {
                display: none;
            }
        }
    }
</style>
