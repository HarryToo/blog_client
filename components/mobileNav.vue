<template>
    <nav class="mobile-nav">
        <ul>
            <nuxt-link :to="{path: '/'}" tag="li">首页</nuxt-link>
            <li class="submenu">
                <header @click="submenuShow = !submenuShow">
                    <span>标签</span>
                    <i :class="submenuShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                </header>
                <div class="submenuList_wrapper">
                    <transition name="slide-down">
                        <ul v-show="submenuShow">
                            <nuxt-link tag="li" v-for="item in labelList" :key="item.id"
                                       :to="{path: '/list/labelArticle/' + item.id, query: {labelName: item.name}}">{{item.name}}
                            </nuxt-link>
                        </ul>
                    </transition>
                </div>
            </li>
            <nuxt-link :to="{path: '/diary'}" tag="li">随记</nuxt-link>
            <nuxt-link :to="{path: '/news'}" tag="li">新闻</nuxt-link>
            <nuxt-link :to="{path: '/about'}" tag="li">关于</nuxt-link>
        </ul>
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
        width: 70vw;
        height: 100vh;
        padding: 10px 14px;
        background-color: #47494e;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
        overflow-y: auto;
        & > ul {
            & > li {
                padding: 5px 0;
                color: #eee;
                border-bottom: 1px solid #515359;
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
                        ul {
                            li {
                                text-indent: 2em;
                                color: #ddd;
                                border-bottom: 1px solid #4d4f55;
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

    @media screen and (min-width: 768px) {
        .mobile-nav {
            display: none;
        }
    }
</style>
