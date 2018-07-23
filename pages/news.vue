<template>
    <section class="news">
        <div class="container">
            <div class="wrapper" v-if="newsList && newsList.length">
                <i class="refresh_btn iconfont icon-shuaxin" title="刷新" v-show="pageIndex===newsList.length-1" @click="refreshNews"></i>
                <div class="item" v-for="item in newsList[pageIndex]" :key="item.uniquekey"
                     :style="{'background-image':`url(${item.thumbnail_pic_s||''})`}" @click="openDetail(item.url)">
                    <div class="cont">
                        <header>{{item.title}}</header>
                        <p class="info">
                            <span>
                                <i class="iconfont icon-mn_yonghu"></i>
                                <span>{{item.author_name}}</span>
                            </span>
                            <span>
                                <i class="iconfont icon-yk_shijian"></i>
                                <span>{{item.date.split(' ')[0]}}</span>
                            </span>
                        </p>
                    </div>
                </div>
                <i class="page_btn page_prev iconfont icon-xiangzuo1" title="上一页" v-show="pageIndex>0" @click="pageIndex--"></i>
                <i class="page_btn page_next iconfont icon-xiangyou1" title="下一页" v-show="pageIndex<newsList.length-1" @click="pageIndex++"></i>
            </div>
            <p v-else class="empty_tips"></p>
        </div>
    </section>
</template>

<script>
    import {blog_name} from '~/config/blog_config'

    export default {
        name: "news",
        asyncData({app}) {
            let newsList = [];
            let params = {
                type: 'keji',
                key: 'bc556aa89b1b8aff7fe367ec6755b647'
            };
            return app.$axios.$get('/juhe/toutiao/index', {params}).then((res) => {
                if (res.error_code === 0) {
                    let data = res.result.data;
                    if (data && data.length) {
                        for (let i = 0; i < 5; i++) {
                            newsList[i] = [];
                            for (let j = 0; j < 6; j++) {
                                newsList[i][j] = data[i * 6 + j];
                            }
                        }
                    }
                }
                return {newsList};
            });
        },
        head() {
            return {
                title: `新闻 - ${blog_name}`,
                meta: [
                    {hid: 'description', name: 'description', content: `${blog_name}, 关于科技的新闻`},
                    {hid: 'keyword', name: 'keyword', content: `${blog_name}, 新闻, 科技`}
                ]
            }
        },
        data() {
            return {
                pageIndex: 0
            }
        },
        methods: {
            refreshNews() {
                this.pageIndex = 0;
                let params = {
                    type: 'keji',
                    key: 'bc556aa89b1b8aff7fe367ec6755b647'
                };
                this.$axios.$get('/juhe/toutiao/index', {params}).then((res) => {
                    if (res.error_code === 0) {
                        let data = res.result.data;
                        let newArr = [];
                        if (data.length) {
                            for (let i = 0; i < 5; i++) {
                                newArr[i] = [];
                                for (let j = 0; j < 6; j++) {
                                    newArr[i][j] = data[i * 6 + j];
                                }
                            }
                            this.newsList = newArr;
                        }
                    }
                });
            },
            openDetail(url) {
                try {
                    window.open(url);
                } catch (e) {
                    location.href = url;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fly-in-enter-active, .fly-in-leave-active {
        transition: transform 0.4s;
    }

    .fly-in-enter, .fly-in-leave-to {
        transform: scale(0);
    }

    .news {
        padding: 6px 0;
        .container {
            height: calc(100vh - 122px);
            padding: 10px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            position: relative;
            .wrapper {
                width: 100%;
                height: 100%;
                overflow: hidden;
                .refresh_btn {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    width: 38px;
                    height: 38px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 22px;
                    cursor: pointer;
                    transition: 0.4s;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.95);
                    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
                    &:hover {
                        color: #41b883;
                        transform: rotate(-90deg);
                    }
                }
                .item {
                    float: left;
                    background-color: #ccc;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    border-radius: 4px;
                    overflow: hidden;
                    &:nth-of-type(1) {
                        width: 100%;
                        height: 40%;
                        margin-bottom: 10px;
                    }
                    &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
                        width: calc((100% - 20px) / 3);
                        height: 30%;
                        margin-bottom: 10px;
                    }
                    &:nth-of-type(3) {
                        margin: 0 10px 10px;
                    }
                    &:nth-of-type(5) {
                        width: 50%;
                        height: calc(30% - 20px);
                        margin-right: 10px;
                    }
                    &:nth-of-type(6) {
                        width: calc(50% - 10px);
                        height: calc(30% - 20px);
                    }
                    @media screen and (max-width: 768px) {
                        &:nth-of-type(1) {
                            margin-bottom: 5px;
                        }
                        &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
                            width: calc((100% - 10px) / 3);
                            height: 30%;
                            margin-bottom: 5px;
                        }
                        &:nth-of-type(3) {
                            margin: 0 5px 5px;
                        }
                        &:nth-of-type(5) {
                            width: 50%;
                            height: calc(30% - 10px);
                            margin-right: 5px;
                        }
                        &:nth-of-type(6) {
                            width: calc(50% - 5px);
                            height: calc(30% - 10px);
                        }
                    }
                    .cont {
                        width: 100%;
                        height: 100%;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        color: #444;
                        background-color: rgba(255, 255, 255, 0.45);
                        text-shadow: 1px 1px 10px #fff;
                        cursor: pointer;
                        transition: 0.4s;
                        @media screen and (max-width: 768px) {
                            padding: 6px;
                            color: #fff;
                            font-weight: lighter;
                            background-color: rgba(0, 0, 0, 0.15);
                            text-shadow: 1px 1px 10px #000;
                        }
                        &:hover {
                            color: #fff;
                            background-color: rgba(0, 0, 0, 0.2);
                            text-shadow: 1px 1px 10px #000;
                        }
                        header {
                            font-size: 14px;
                            font-weight: bold;
                            @media screen and (max-width: 768px) {
                                font-size: 12px;
                            }
                        }
                        .info {
                            padding-top: 10px;
                            display: flex;
                            flex-wrap: wrap;
                            font-size: 12px;
                            & > span {
                                i {
                                    vertical-align: middle;
                                    padding-right: 4px;
                                    @media screen and (max-width: 768px) {
                                        font-size: 12px;
                                    }
                                }
                                &:first-child {
                                    padding-right: 14px;
                                    @media screen and (max-width: 768px) {
                                        display: none;
                                    }
                                }
                            }
                        }
                    }
                    &:hover {
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    }
                }
                .page_btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 8px;
                    font-size: 24px;
                    background-color: rgba(255, 255, 255, 0.95);
                    cursor: pointer;
                    transition: 0.4s;
                    &:hover {
                        color: #41b883;
                    }
                }
                .page_prev {
                    left: 0;
                    border-radius: 0 50% 50% 0;
                    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
                }
                .page_next {
                    right: 0;
                    border-radius: 50% 0 0 50%;
                    box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
                }
            }
            .detail {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 9;
                width: 100%;
                height: 100%;
                padding: 10px 10px 0;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 4px;
                overflow-y: hidden;
                .close_btn {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    width: 38px;
                    height: 38px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 22px;
                    cursor: pointer;
                    transition: 0.4s;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.95);
                    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
                    &:hover {
                        transform: rotate(90deg);
                    }
                }
                iframe {
                    width: 100%;
                    height: calc(100% + 18px);
                    border: none;
                }
            }
        }
    }
</style>
