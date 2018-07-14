<template>
    <div id="banner">
        <div class="container">
            <div class="pc_swiper">
                <el-carousel type="card" height="320px">
                    <el-carousel-item v-for="item in topArticle" :key="item.id">
                        <nuxt-link :to="{path: '/detail/'+item.id}" :title="item.title">
                            <img v-if="item.cover.length" :src="item.cover | qiniuDomain" :title="item.title">
                            <i v-else class="iconfont icon-mianwubiaoqing"> ...</i>
                            <p class="title">{{item.title}}</p>
                        </nuxt-link>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="mobile_swiper" @touchstart="touchStartHandler" @touchend="touchEndHandler">
                <el-carousel height="210px" ref="mobileSwiper">
                    <el-carousel-item v-for="item in topArticle" :key="item.id">
                        <nuxt-link :to="{path: '/detail/'+item.id}">
                            <img v-if="item.cover.length" :src="item.cover | qiniuDomain" :title="item.title">
                            <i v-else class="iconfont icon-mianwubiaoqing"> ...</i>
                            <p class="title">{{item.title}}</p>
                        </nuxt-link>
                    </el-carousel-item>
                </el-carousel>
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
                topArticle: [],
                swiperOption: {
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    grabCursor: true,
                    pagination: {
                        el: '.swiper-pagination',
                        dynamicBullets: true
                    }
                },
                touchStartX: 0
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
                }
            });
        },
        methods: {
            touchStartHandler(e) {
                this.touchStartX = e.changedTouches[0].clientX;
            },
            touchEndHandler(e) {
                const touchEndX = e.changedTouches[0].clientX;
                if (Math.abs(touchEndX - this.touchStartX) > 60) {
                    if (touchEndX > this.touchStartX) {
                        this.$refs.mobileSwiper.prev();
                    } else {
                        this.$refs.mobileSwiper.next();
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #banner {
        padding: 6px 0;
        .pc_swiper {
            .el-carousel__container {
                .el-carousel__item {
                    border-radius: 4px;
                    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.12);
                    a {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
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
                            padding: 10px;
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
        .mobile_swiper {
            display: none;
            .el-carousel__container {
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
                        padding: 8px 10px;
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
            padding-top: 0;
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
