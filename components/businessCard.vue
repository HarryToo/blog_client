<template>
    <div class="business_card">
        <header class="column_header">
            <i class="iconfont icon-wawa"></i>
            <span>关于</span>
        </header>
        <div class="main" title="更多关于" @click="$router.push('/about')">
            <div class="portrait">
                <img v-if="portrait.length" :src="portrait | qiniuDomain">
                <i v-else class="iconfont icon-mianwubiaoqing"></i>
            </div>
            <p class="nickname">{{nickname}}</p>
            <p class="self_intro">{{self_intro}}</p>
            <ul class="statistics_list">
                <li>
                    <p class="num">{{article_total}}</p>
                    <p class="column">文章</p>
                </li>
                <li>
                    <p class="num">{{label_total}}</p>
                    <p class="column">标签</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {domain} from '~/config/qiniu_config'

    export default {
        name: "businessCard",
        data() {
            return {
                portrait: '',
                nickname: '',
                self_intro: '',
                article_total: '',
                label_total: ''
            }
        },
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}`;
            }
        },
        mounted() {
            this.$axios.$get('/api/individuation/getIndividuation').then((res) => {
                if (res.code === 200) {
                    this.portrait = res.data.portrait;
                    this.nickname = res.data.nickname;
                    this.self_intro = res.data.self_intro;
                }
            });
            this.$axios.$get('/api/article/getArticleTotal').then((res) => {
                if (res.code === 200) {
                    this.article_total = res.data;
                }
            });
            this.$axios.$get('/api/label/getLabelTotal').then((res) => {
                if (res.code === 200) {
                    this.label_total = res.data;
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .business_card {
        header {
            span {
                text-shadow: 0 0 12px #fff, 0 0 12px #fff;
            }
        }
        .main {
            margin-bottom: 6px;
            padding: 15px 10px;
            background-color: rgba(255, 255, 255, .95);
            box-shadow: 0 0 10px rgba(0, 0, 0, .05);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
                background-color: rgba(255, 255, 255, 0.98);
                border-color: #41b883;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1), 2px 2px 10px rgba(65, 184, 131, 0.12);
            }
            .portrait {
                width: 84px;
                height: 84px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(0, 0, 0, 0.3);
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    min-height: 100%;
                }
                i {
                    font-size: 2.4rem;
                    color: #ccc;
                }
            }
            .nickname {
                padding: 14px 0 10px;
                font-size: 18px;
                font-weight: bold;
            }
            .self_intro {
                color: #999;
                font-size: 14px;
            }
            .statistics_list {
                padding-top: 20px;
                display: flex;
                li {
                    padding: 0 20px;
                    text-align: center;
                    border-right: 1px solid #eee;
                    &:last-child {
                        border-right: none;
                    }
                    .num {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .column {
                        color: #999;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
