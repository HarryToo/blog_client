<template>
    <footer>
        <div class="container clearfix">
            <p class="slogan tl">{{text.left}}</p>
            <p class="copyright tr">{{text.right}}</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "vfooter",
        props: ['text']
    }
</script>

<style lang="scss" scoped>
    footer {
        height: 60px;
        line-height: 60px;
        background-color: rgba(255, 255, 255, .95);
        color: #999;
        font-size: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        .container {
            & > p {
                float: left;
            }
            .slogan {
                width: 64%;
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
            .copyright {
                width: 36%;
                @media screen and (max-width: 768px) {
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
</style>
