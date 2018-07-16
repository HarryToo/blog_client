<template>
    <div id="index">
        <banner :bannerList="bannerList"></banner>
        <div class="container">
            <div class="cont">
                <div class="left_cont">
                    <article-list :articleList="articleList"></article-list>
                </div>
                <right-side></right-side>
            </div>
        </div>
    </div>
</template>

<script>
    import banner from '~/components/banner'
    import articleList from '~/components/articleList'
    import rightSide from '~/components/rightSide'

    export default {
        name: 'index',
        components: {
            banner,
            articleList,
            rightSide
        },
        async asyncData({app}) {
            let articleRes = await app.$axios.$get('/api/article/getArticleList');
            let bannerRes = await app.$axios.$get('/api/article/getArticleList', {params: {isOnlyTop: true}});
            return {
                articleList: articleRes.data,
                bannerList: bannerRes.data
            }
        },
        data() {
            return {
                backdropUrl: '',
                logoUrl: '',
                pageIndex: 1
            }
        },
        mounted() {
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.scrollHandle);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollHandle);
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
    #index {
        .cont {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .left_cont {
                width: calc(70% - 12px);
            }
        }
    }

    @media screen and (max-width: 992px) {
        #index {
            .cont {
                .left_cont {
                    width: 100%;
                }
            }
        }
    }
</style>
