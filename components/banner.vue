<template>
    <div id="banner">
        <div class="container">
            <div class="swiper-container pc_swiper" style="height: 320px;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in topArticle" :key="item.id">
                        <nuxt-link :to="{path: '/detail/'+item.id}" :title="item.title">
                            <img v-if="item.cover.length" :src="item.cover | qiniuDomain" :title="item.title">
                            <i v-else class="iconfont icon-mianwubiaoqing"> ...</i>
                            <p class="title">{{item.title}}</p>
                        </nuxt-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="swiper-container mobile_swiper" style="height: 210px;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in topArticle" :key="item.id">
                        <nuxt-link :to="{path: '/detail/'+item.id}" :title="item.title">
                            <img v-if="item.cover.length" :src="item.cover | qiniuDomain" :title="item.title">
                            <i v-else class="iconfont icon-mianwubiaoqing"> ...</i>
                            <p class="title">{{item.title}}</p>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {domain} from '~/config/qiniu_config'

    export default {
        name: "banner",
        data() {
            return {
                topArticle: []
            }
        },
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}-banner`;
            }
        },
        mounted() {
            this.$axios.$get('/api/article/getArticleList', {params: {isOnlyTop: true}}).then((res) => {
                if (res.code === 200) {
                    this.topArticle = res.data;
                    this.initSwiper();
                }
            });
        },
        methods: {
            initSwiper() {
                setTimeout(() => {
                    new Swiper('.pc_swiper', {
                        slidesPerView: 2,
                        spaceBetween: 12,
                        loop: true,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    });
                    new Swiper('.mobile_swiper', {
                        loop: true,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false
                        }
                    });
                }, 0)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #banner {
        padding: 15px 0 20px;
        .pc_swiper {
            border-radius: 4px;
            .swiper-slide {
                a {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 4px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    background-color: #eee;
                    overflow: hidden;
                    img {
                        width: 100%;
                        min-height: 100%;
                    }
                    i {
                        font-size: 100px;
                        color: #ccc;
                    }
                    .title {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        padding: 8px 10px;
                        text-align: center;
                        font-weight: bold;
                        background-color: rgba(255, 255, 255, 0.8);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .mobile_swiper {
            display: none;
            .swiper-slide {
                a {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    background-color: #eee;
                    img {
                        width: 100%;
                        min-height: 100%;
                    }
                    i {
                        font-size: 80px;
                        color: #ccc;
                    }
                    .title {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        padding: 6px 10px;
                        text-align: center;
                        font-size: 14px;
                        font-weight: bold;
                        background-color: rgba(255, 255, 255, 0.8);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1160px) {
        #banner {
            padding: 0 0 6px;
        }
    }

    @media screen and (max-width: 768px) {
        #banner {
            .pc_swiper {
                display: none;
            }
            .mobile_swiper {
                display: block;
            }
        }
    }
</style>
