<template>
    <div class="label_list animated fadeInUp">
        <header class="column_header">
            <i class="iconfont icon-mn_biaoqian"></i>
            <span>标签</span>
        </header>
        <ul class="list">
            <nuxt-link :to="{path: '/list/labelArticle/' + item.id, query: {labelName: item.name}}" tag="li" v-for="item in labelList" :key="item.id">{{item.name}}</nuxt-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "labelList",
        computed: {
            labelList() {
                return this.$store.state.labelList;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .label_list {
        header {
            span {
                text-shadow: 0 0 12px #fff, 0 0 12px #fff;
            }
        }
        .list {
            margin-bottom: 6px;
            padding: 6px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            overflow: hidden;
            li {
                float: left;
                margin: 5px;
                padding: 6px 10px;
                color: #999;
                border: 1px solid #eee;
                border-radius: 4px;
                background-color: #fff;
                cursor: pointer;
                &:hover {
                    color: #41b883;
                    border-color: #41b883;
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
</style>
