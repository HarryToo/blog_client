<template>
    <div id="list">
        <div class="container">
            <div class="cont">
                <div class="left_cont">
                    <article-list :keyword="$route.params.keyword" :articleList="articleList"></article-list>
                </div>
                <right-side></right-side>
            </div>
        </div>
    </div>
</template>

<script>
    import articleList from '~/components/articleList'
    import rightSide from '~/components/rightSide'
    import {blog_name} from '~/config/blog_config'

    export default {
        name: 'index',
        components: {
            articleList,
            rightSide
        },
        head() {
            return {
                title: `${this.$route.params.keyword} - ${blog_name}`,
                meta: [
                    {hid: 'description', name: 'description', content: `${blog_name}, ${this.$route.params.keyword}`},
                    {hid: 'keyword', name: 'keyword', content: `${blog_name}, ${this.$route.params.keyword}`}
                ]
            }
        },
        asyncData({app, route}) {
            let keyword = route.params.keyword;
            return app.$axios.$get('/api/article/getArticleList', {params: {searchVal: keyword}}).then((res) => {
                if (res.code === 200) {
                    return {articleList: res.data};
                }
            });
        },
        data() {
            return {
                pageIndex: 1
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollHandle);
        },
        methods: {
            scrollHandle() {
                let wScrollY = window.scrollY;
                let wInnerH = window.innerHeight;
                let bScrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
                if (wScrollY + wInnerH >= bScrollH) {
                    this.loadArticleList();
                }
            },
            loadArticleList() {
                this.pageIndex++;
                let params = {
                    searchVal: this.$route.params.keyword,
                    pageIndex: this.pageIndex
                };
                this.$axios.$get('/api/article/getArticleList', {params}).then((res) => {
                    if (res.code === 200) {
                        if (res.data.length) {
                            this.articleList = [...this.articleList, ...res.data];
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #list {
        padding-top: 6px;
        .cont {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .left_cont {
                width: calc(70% - 12px);
            }
            .right_cont {
                width: 30%;
            }
        }
    }

    @media screen and (max-width: 992px) {
        #list {
            .cont {
                .left_cont {
                    width: 100%;
                }
                .right_cont {
                    width: 100%;
                    .recommend {
                        display: none;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        #list {
            .container {
                padding: 0;
            }
        }
    }
</style>
