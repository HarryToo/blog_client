<template>
    <nav class="mobile-nav">
        <div class="menu_list">
            <nuxt-link :to="{path: '/'}">首页</nuxt-link>
            <a class="submenu">
                <header @click="submenuShow = !submenuShow">
                    <span>标签</span>
                    <i :class="`iconfont ${submenuShow?'icon-xiangshang2':'icon-xiangxia2'}`"></i>
                </header>
                <div class="submenuList_wrapper">
                    <transition name="slide-down">
                        <div class="submenu_list" v-show="submenuShow">
                            <nuxt-link v-for="item in labelList" :key="item.id"
                                       :to="{path: '/list/labelArticle/' + item.id, query: {labelName: item.name}}">{{item.name}}
                            </nuxt-link>
                        </div>
                    </transition>
                </div>
            </a>
            <nuxt-link :to="{path: '/diary'}">随记</nuxt-link>
            <nuxt-link :to="{path: '/news'}">新闻</nuxt-link>
            <nuxt-link :to="{path: '/about'}">关于</nuxt-link>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "mobileNav",
        data() {
            return {
                config: {
                    sites: ['qq', 'qzone', 'weibo', 'wechat', 'douban'],
                    wechatQrcodeHelper: '<p>扫一扫</p><p>分享本站至朋友圈</p>'
                },
                submenuShow: false,
                labelList: []
            }
        },
        mounted() {
            this.getLabelList();
        },
        methods: {
            getLabelList() {
                this.$axios.$get('/api/label/getLabelList').then((res) => {
                    if (res.code === 200) {
                        this.labelList = res.data;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: 0.2s;
    }

    .slide-down-enter, .slide-down-leave-to {
        transform: translateY(-100%);
    }

    .mobile-nav {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 72vw;
        height: 100vh;
        padding: 10px 14px;
        background-color: rgba(255, 255, 255, 0.96);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
        overflow-y: auto;
        .menu_list {
            a {
                display: block;
                border-bottom: 1px solid #eee;
            }
            & > a {
                padding: 5px 0;
                &.nuxt-link-exact-active {
                    color: #41b883;
                    border-color: #41b883;
                }
                &.submenu {
                    header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .submenuList_wrapper {
                        overflow: hidden;
                        .submenu_list {
                            a {
                                text-indent: 2em;
                                &.nuxt-link-exact-active {
                                    color: #41b883;
                                    border-color: #41b883;
                                }
                                &:last-child {
                                    border-bottom: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 769px) {
        .mobile-nav {
            display: none;
        }
    }
</style>
