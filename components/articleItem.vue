<template>
    <article>
        <nuxt-link :to="{path: '/detail/'+article.id}" class="article_item animated fadeInUp">
            <div class="cover" :title="article.title">
                <img v-if="article.cover.length" :src="article.cover | qiniuDomain" :title="article.title">
                <i v-else class="iconfont icon-mianwubiaoqing"> ...</i>
            </div>
            <div class="text">
                <header :title="article.title">{{article.title}}</header>
                <p class="brief">{{article.brief}}</p>
                <p class="addition">
                <span class="date" title="更新时间">
                    <i class="iconfont icon-yk_shijian"></i>
                    <span>{{article.date}}</span>
                </span>
                    <span class="hits" :title="`共${article.hits}次阅读`">
                    <i class="iconfont icon-eye"></i>
                    <span>{{article.hits}}</span>
                </span>
                </p>
            </div>
        </nuxt-link>
    </article>
</template>

<script>
    import {domain} from '~/config/qiniu_config'

    export default {
        name: "articleItem",
        props: {
            article: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}-articleListCover`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article_item {
        position: relative;
        height: 150px;
        margin-bottom: 6px;
        padding: 6px 6px 6px 3px;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        border-left: 3px solid transparent;
        border-radius: 4px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .cover {
            width: 26%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #f8f8f8;
            background-color: #eee;
            border-radius: 4px;
            overflow: hidden;
            img {
                width: 100%;
                min-height: 100%;
                transition: 0.5s;
            }
            i {
                font-size: 2.4rem;
                color: #ccc;
            }
        }
        .text {
            width: 74%;
            height: 100%;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            header {
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .brief {
                height: 66px;
                padding-top: 2px;
                color: #999;
                font-size: 14px;
                overflow: hidden;
            }
            .addition {
                color: #999;
                font-size: 14px;
                & > span {
                    padding-right: 24px;
                    i {
                        padding-right: 8px;
                        font-size: 14px;
                    }
                }
            }
        }
        &:hover {
            background-color: rgba(255, 255, 255, 0.95);
            border-color: #41b883;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1), 2px 2px 10px rgba(65, 184, 131, 0.12);
            .cover {
                img {
                    transform: scale(1.15);
                }
            }
            .text {
                header {
                    color: #37986d;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .article_item {
            height: 100px;
            .cover {
                width: 36%;
            }
            .text {
                width: 64%;
                padding-left: 10px;
                header {
                    font-size: 14px;
                }
                .brief {
                    height: 38px;
                    font-size: 13px;
                }
                .addition {
                    font-size: 12px;
                }
            }
        }
    }
</style>
