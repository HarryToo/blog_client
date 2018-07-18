<template>
    <div class="about">
        <div class="container">
            <div class="banner" v-if="aboutBanner.length">
                <img :src="aboutBanner | qiniuDomain" alt="">
            </div>
            <div class="content">
                <div class="ql-editor" v-html="about"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {blog_name} from '~/config/blog_config'
    import {domain} from '~/config/qiniu_config'

    export default {
        name: "about",
        asyncData({app}) {
            return app.$axios.$get('/api/individuation/getIndividuation').then((res) => {
                if (res.code === 200) {
                    return {
                        about: res.data.about,
                        aboutBanner: res.data.about_banner
                    };
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
        },
        filters: {
            qiniuDomain(key) {
                return `${domain}/${key}`;
            }
        }
    }
</script>

<style lang="scss">
    .about {
        padding: 6px 0;
        .container {
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            .banner {
                img {
                    display: block;
                    width: 100%;
                }
            }
            .content {
                padding: 15px 10px 10px;
                .ql-editor {
                    padding: 0;
                    font-size: 15px;
                    img {
                        max-width: 100%;
                    }
                }
            }
        }
    }
</style>
