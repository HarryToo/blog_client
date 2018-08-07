<template>
    <div class="business_card animated fadeInUp">
        <header class="column_header">
            <i class="iconfont icon-wawa"></i>
            <span>关于</span>
        </header>
        <div class="main" title="更多关于" @click="$router.push('/about')">
            <div class="portrait">
                <img v-if="businessCardData.portrait.length" :src="businessCardData.portrait | qiniuDomain">
                <i v-else class="iconfont icon-mianwubiaoqing"></i>
            </div>
            <p class="nickname">{{businessCardData.nickname}}</p>
            <p class="self_intro">{{businessCardData.self_intro}}</p>
            <ul class="statistics_list">
                <li>
                    <p class="num">{{articleTotal}}</p>
                    <p class="column">文章</p>
                </li>
                <li>
                    <p class="num">{{labelTotal}}</p>
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
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}`;
            }
        },
        computed: {
            businessCardData(){
                return this.$store.state.businessCardData;
            },
            articleTotal(){
                return this.$store.state.articleTotal;
            },
            labelTotal(){
                return this.$store.state.labelTotal;
            }
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
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, .05);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
                background-color: rgba(255, 255, 255, 0.95);
                border-color: #41b883;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1), 2px 2px 10px rgba(65, 184, 131, 0.12);
            }
            .portrait {
                width: 84px;
                height: 84px;
                line-height: 84px;
                text-align: center;
                border-radius: 50%;
                background-color: #e5f1eb;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                img {
                    width: 100%;
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
