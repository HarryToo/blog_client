<template>
    <div class="recommend">
        <article-list :header="'推荐'" :articleList="articleList"></article-list>
    </div>
</template>

<script>
    import articleList from '~/components/articleList'

    export default {
        name: "recommend",
        components: {
            articleList
        },
        data() {
            return {
                articleList: []
            }
        },
        mounted() {
            this.getRecommendArticles();
        },
        methods: {
            getRecommendArticles() {
                this.$axios.$get('/api/article/getArticleList', {params: {isOnlyTop: true}}).then((res) => {
                    if (res.code === 200) {
                        this.articleList = res.data;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .recommend {
        .article_list{
            .article_item {
                height: 90px;
                .cover{
                    width: 34%;
                }
                .text{
                    width: 66%;
                    .title{
                        font-size: 14px;
                    }
                    .brief{
                        display: none;
                    }
                    .addition{
                        display: flex;
                        flex-direction: column;
                        span{
                            font-size: 12px;
                        }
                        .hits{
                            padding-top: 4px;
                        }
                    }
                }
            }
        }
    }
</style>
