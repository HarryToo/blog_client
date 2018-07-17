<template>
    <div class="about">
        <div class="container">
            <div class="content ql-editor" v-html="about"></div>
        </div>
    </div>
</template>

<script>
    import {blog_name} from '~/config/blog_config'

    export default {
        name: "about",
        asyncData({app}) {
            return app.$axios.$get('/api/individuation/getIndividuation').then((res) => {
                if (res.code === 200) {
                    return {about: res.data.about};
                }
            });
        },
        head() {
            return {
                title: `关于 - ${blog_name}`,
                meta: [
                    {hid: 'description', name: 'description', content: `${blog_name}, 关于`},
                    {hid: 'keyword', name: 'keyword', content: `${blog_name}, 关于, 博客介绍`}
                ]
            }
        }
    }
</script>

<style lang="scss">
    .about {
        padding: 6px 0;
        .container {
            min-height: calc(100vh - 122px);
            padding: 10px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            .ql-editor {
                padding: 0;
                font-size: 15px;
                img {
                    max-width: 100%;
                }
            }
        }
    }
</style>
