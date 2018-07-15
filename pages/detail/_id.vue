<template>
    <div id="detail">
        <div class="container">
            <div class="cont">
                <div class="left_cont">
                    <div class="main">
                        <header>
                            <p class="title">{{article.title}}</p>
                            <span class="date" title="更新时间">
                                <i class="iconfont icon-yk_shijian"></i>
                                <span>{{article.date}}</span>
                            </span>
                            <span class="author" :title="`共${article.hits}次阅读`">
                                <i class="iconfont icon-eye"></i>
                                <span>{{article.hits}}</span>
                            </span>
                            <p class="digest">{{article.brief}}</p>
                        </header>
                        <div class="cover" v-if="article.cover.length">
                            <img :src="article.cover | qiniuDomain" :title="article.title">
                        </div>
                        <div class="content">
                            <div v-for="(item, index) in article.content" :key="index">
                                <highlight-code auto v-if="item.isCode" :code="item.cont"></highlight-code>
                                <div class="ql-editor" v-else v-html="item.cont"></div>
                            </div>
                        </div>
                        <comment :articleId="article.id"></comment>
                    </div>
                </div>
                <right-side></right-side>
            </div>
        </div>
        <transition name="fade-in">
            <div class="picture_view" v-show="viewImgUrl.length" @click="closePictureView"><img :src="viewImgUrl"></div>
        </transition>
    </div>
</template>

<script>
    import articleList from '~/components/articleList'
    import rightSide from '~/components/rightSide'
    import comment from '~/components/comment'
    import {domain} from '~/config/qiniu_config'
    import {blog_name} from '~/config/blog_config'

    // 拆分富文本文章内容中的文字和代码块（以适应前端代码高亮）
    function dismantle(cont) {
        let dismantleCont = [];
        while (cont.length > 0) {
            let flag = '<pre class="ql-syntax" spellcheck="false">';
            if (cont.indexOf(flag) >= 0) {
                if (cont.indexOf(flag) !== 0) {
                    let codeOrigin = cont.indexOf(flag);
                    dismantleCont.push({
                        isCode: false,
                        cont: cont.substring(0, codeOrigin)
                    });
                    cont = cont.substring(codeOrigin);
                } else {
                    let destination = cont.indexOf('</pre>');
                    dismantleCont.push({
                        isCode: true,
                        cont: cont.substring(flag.length, destination).replace(/\&gt;/g, '>').replace(/\&lt;/g, '<')
                    });
                    cont = cont.substring(destination + 6);
                }
            } else {
                dismantleCont.push({
                    isCode: false,
                    cont: cont
                });
                cont = '';
            }
        }
        return dismantleCont;
    }

    export default {
        name: "detail",
        head() {
            return {
                title: `${this.article.title} - ${blog_name}`,
                meta: [
                    {hid: 'description', name: 'description', content: `${blog_name}, 文章, ${this.article.brief}`},
                    {hid: 'keyword', name: 'keyword', content: `${blog_name}, 文章, ${this.article.title}`}
                ]
            }
        },
        asyncData({app, route}) {
            const id = route.params.id;
            return app.$axios.$get('/api/article/getArticleById', {params: {id}}).then((res) => {
                if (res.code === 200) {
                    res.data.content = dismantle(res.data.content);
                    return {article: res.data};
                }
            });
        },
        components: {
            articleList,
            comment,
            rightSide
        },
        data() {
            return {
                dismantleCont: [],
                viewImgUrl: ''
            }
        },
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}-banner`;
            }
        },
        mounted() {
            this.updateArticleHits();
            let imgs = document.querySelectorAll('#detail img');
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].addEventListener('click', () => {
                    this.viewImgUrl = imgs[i].src;
                    this.banSlide(true);
                });
            }
        },
        watch: {
            $route: 'updateArticleHits'
        },
        methods: {
            updateArticleHits() {
                window.scrollTo(0, 0);
                this.$axios.$post('/api/article/updateArticleHits', {"id": this.$route.params.id});
            },
            closePictureView() {
                this.viewImgUrl = '';
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
    .fade-in-enter-active, .fade-in-leave-active {
        transition: 0.5s;
    }

    .fade-in-enter, .fade-in-leave-to {
        opacity: 0;
    }

    #detail {
        padding-top: 6px;
        .cont {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .left_cont {
                width: calc(70% - 12px);
                .main {
                    margin-bottom: 6px;
                    padding: 10px;
                    background-color: rgba(255, 255, 255, .9);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                    border-radius: 4px;
                    header {
                        margin-bottom: 20px;
                        .title {
                            padding-left: 10px;
                            margin-bottom: 10px;
                            font-size: 20px;
                            font-weight: bold;
                            border-left: 3px solid #41b883;
                        }
                        .date, .author {
                            padding-right: 24px;
                            color: #bbb;
                            font-size: 12px;
                            i {
                                padding-right: 4px;
                                font-size: 14px;
                            }
                        }
                        .digest {
                            padding: 10px;
                            margin-top: 10px;
                            color: #999;
                            font-size: 14px;
                            text-indent: 2em;
                            border-radius: 4px;
                            background-color: #f8f8f8;
                        }
                    }
                    .cover {
                        text-align: center;
                        img {
                            max-width: 100%;
                            border-radius: 4px;
                        }
                    }
                    .content {
                        margin: 20px 0;
                        padding: 10px 0;
                        font-size: 15px;
                        border-top: 1px dashed #eee;
                        border-bottom: 1px dashed #eee;
                        pre {
                            padding: 10px 0;
                        }
                    }
                }
            }
        }
        .picture_view {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            width: 100vw;
            height: 100vh;
            line-height: 100vh;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.9);
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
            img {
                width: auto;
            }
            &:after {
                content: '点击关闭';
                position: fixed;
                bottom: 3vh;
                left: 50%;
                transform: translateX(-50%);
                line-height: normal;
                padding: 4px 12px;
                color: #ddd;
                font-size: 14px;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
            }
        }
    }

    @media screen and (max-width: 992px) {
        #detail {
            .cont {
                .left_cont {
                    width: 100%;
                }
            }
        }
    }
</style>
