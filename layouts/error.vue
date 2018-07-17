<template>
    <section class="error">
        <div class="container">
            <div class="face">
                <i class="iconfont icon-icon-test"></i>
            </div>
            <div class="text tc">
                <h1 class="title">{{ error.statusCode }}</h1>
                <p class="info" v-if="error.statusCode === 404">😥 页面飞了 ~</p>
                <p class="info" v-else>😥 {{ error.message }}</p>
                <nuxt-link class="back_home" to="/" v-if="error.statusCode === 404">返回首页</nuxt-link>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: ['error']
    }
</script>

<style lang="scss" scoped>
    .error {
        .container {
            padding-top: 120px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            .face {
                animation: swing 1s linear infinite;
                padding: 0 50px;
                text-align: center;
                i {
                    color: #999;
                    font-size: 180px;
                }
            }
            .text {
                padding: 0 40px;
                .title {
                    color: #ccc;
                    font-size: 60px;
                    font-weight: bold;
                }
                .info {
                    padding: 10px 0 20px;
                    color: #999;
                    font-size: 24px;
                }
                .back_home {
                    display: block;
                    color: #41b883;
                }
            }
        }
    }

    @keyframes swing {
        0% {
            transform: rotate(-6deg);
        }
        50%{
            transform: rotate(6deg);
        }
        100% {
            transform: rotate(-6deg);
        }
    }
</style>
