<template>
    <div class="comment">
        <header><i class="iconfont icon-mn_hudong"></i><span>留言</span></header>
        <textarea placeholder="既然来了，留下点什么吧 ..." class="comment_cont" v-model="content"></textarea>
        <div style="padding: 10px 0;display: flex;justify-content: space-between;">
            <input v-model="username" class="comment_user" placeholder="留个名字吧">
            <button class="comment_btn" @click="submitComment">提交</button>
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
        <div class="comment_pop" v-show="showPop">{{message}}</div>
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
                showPop: false,
                message: ''
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
                            this.showMessage('评论成功');
                            this.content = '';
                            this.username = '';
                        }
                    });
                } else {
                    this.showMessage('请输入评论内容');
                }
            },
            showMessage(msg) {
                this.showPop = true;
                this.message = msg;
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
            .iconfont {
                padding-right: 6px;
                vertical-align: middle;
                color: #41b883;
            }
        }
        .comment_cont {
            width: 100%;
            min-height: 10em;
            padding: 6px 10px;
            resize: vertical;
            outline: none;
        }
        .comment_user {
            width: 80%;
            margin-right: 15px;
            font-size: 14px;
            padding: 10px;
        }
        .comment_cont, .comment_user {
            border-color: #eee;
            border-radius: 4px;
            &::-webkit-input-placeholder {
                color: #bbb;
            }
            &::-moz-placeholder {
                color: #bbb;
            }
            &:-moz-placeholder {
                color: #bbb;
            }
            &:-ms-input-placeholder {
                color: #bbb;
            }
        }
        .comment_btn {
            width: 18%;
            border: none;
            outline: none;
            background-color: rgba(65, 184, 131, 0.8);
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            &:hover {
                background-color: #41b883;
            }
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
