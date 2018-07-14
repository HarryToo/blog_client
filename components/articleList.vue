<template>
    <div class="article">
        <header class="column_header">
            <i :class="header==='推荐'?'iconfont icon-hh_hao':'iconfont icon-mn_dingdan'"></i>
            <span v-if="keyword.length">有关 “{{keyword}}” 的文章</span>
            <span v-else-if="header.length">{{header}}</span>
            <span v-else>文章</span>
        </header>
        <div class="article_list" v-if="articleList.length">
            <article-item v-for="item in articleList" :article="item" :key="item.id"></article-item>
        </div>
        <p v-else class="empty_tips"></p>
    </div>
</template>

<script>
    import articleItem from '~/components/articleItem'

    export default {
        name: "articleList",
        props: {
            keyword: {
                type: String,
                default: ''
            },
            header: {
                type: String,
                default: ''
            },
            articleList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            articleItem
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        margin-bottom: 6px;
        header {
            span {
                text-shadow: 0 0 12px #fff, 0 0 12px #fff;
            }
        }
    }
</style>
