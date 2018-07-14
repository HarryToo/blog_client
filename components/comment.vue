<template>
    <div class="comment">
        <header><i class="el-icon-edit" style="padding-right: 10px;"></i><span>评论</span></header>
        <el-input type="textarea" :rows="5" placeholder="既然来了，留下点什么吧 ..." v-model="content"></el-input>
        <div style="padding: 10px 0;display: flex;justify-content: space-between;">
            <el-input v-model="username" placeholder="留个名字吧" style="width: 80%;margin-right: 10px;"></el-input>
            <el-button type="success" plain @click="submitComment">提交</el-button>
        </div>
        <ul class="comment_list" v-if="commentList.length">
            <li class="comment_item" v-for="(item, index) in commentList" :key="item.id">
                <span class="identity">
                    <span class="username">
                        <i class="iconfont icon-wawa"></i>
                        <span>{{item.username}}：</span>
                    </span>
                    <span class="level">{{commentList.length-index}} 楼</span>
                </span>
                <div class="main">
                    <p class="content">{{item.content}}</p>
                    <p class="time" title="评论时间">
                        <i class="iconfont icon-yk_shijian"></i>
                        <span>{{item.date}}</span>
                    </p>
                    <div v-if="item.reply" class="reply">
                        <span class="identity" style="color: #41b883;">站长回复：</span>
                        <div class="main">
                            <p class="content">{{item.reply}}</p>
                            <p class="time" title="回复时间">
                                <i class="iconfont icon-yk_shijian"></i>
                                <span>{{item.reply_date}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else style="color: #ccc;text-align: center;padding: 20px 0;">暂无评论</p>
        <div class="comment_pop" v-show="showPop">评论成功</div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        data() {
            return {
                content: '',
                username: '',
                commentList: [],
                showPop: false
            }
        },
        props: ['articleId'],
        mounted() {
            this.getCommentByArticleId();
        },
        watch: {
            articleId: 'getCommentByArticleId',
            showPop(val, oldval) {
                if (val === true) {
                    setTimeout(() => {
                        this.showPop = false;
                    }, 2000);
                }
            }
        },
        methods: {
            getCommentByArticleId() {
                this.$axios.$get('/api/comment/getCommentByArticleId', {params: {articleId: this.articleId}}).then((res) => {
                    if (res.code === 200) {
                        this.commentList = res.data;
                    }
                });
            },
            submitComment() {
                if (this.content.trim().length) {
                    let params = {
                        articleId: this.articleId,
                        content: this.content.trim(),
                        username: this.username
                    };
                    this.$axios.$post('/api/comment/addComment', params).then((res) => {
                        if (res.code === 200) {
                            this.commentList = res.data;
                            this.getCommentByArticleId();
                            this.showPop = true;
                            this.content = '';
                            this.username = '';
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        position: relative;
        color: #999;
        font-size: 14px;
        header {
            padding-bottom: 10px;
        }
        .comment_list {
            padding-top: 10px;
            .comment_item {
                margin-bottom: 12px;
                display: flex;
                flex-direction: column;
                border-bottom: 1px dashed #eee;
                &:last-child {
                    margin-bottom: 0;
                    border-bottom: none;
                }
                .identity {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .username {
                        .iconfont {
                            color: #bbb;
                            font-size: 36px;
                            vertical-align: middle;
                            padding-right: 10px;
                        }
                    }
                    .level {
                        color: #bbb;
                    }
                }
                .main {
                    padding-left: 5em;
                    .content {
                        line-height: 20px;
                        color: #777;
                    }
                    .time {
                        padding: 6px 0 12px;
                        color: #bbb;
                        font-size: 12px;
                        .iconfont {
                            font-size: 12px;
                            padding-right: 4px;
                        }
                    }
                }
            }
        }
        .comment_pop {
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translate(-50%, 50%);
            padding: 10px;
            border-radius: 4px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
</style>
