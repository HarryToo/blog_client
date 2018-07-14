let {blog_name} = require('./config/blog_config');

module.exports = {
    head: {
        title: blog_name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'},
            {hid: 'description', name: 'description', content: `${blog_name}, 杜航的个人博客`},
            {hid: 'keyword', name: 'keyword', content: `${blog_name}, 个人博客, 程序员, 前端开发, 编程`}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_648952_2i7zjt8sae5.css'}
        ]
    },
    loading: {color: '#41b883'},
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    proxy: {
        '/api': {
            target: 'http://localhost:3001/',
            pathRewrite: {'^/api': '/'}
        },
        '/juhe': {
            target: 'http://v.juhe.cn/',
            pathRewrite: {'^/juhe': '/'}
        }
    },
    build: {
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        },
        vendor: ['axios', '~/plugins/element-ui', '~/plugins/vue-quill-editor', '~/plugins/vue-highlight', '~/plugins/vue-event-calendar']
    },
    plugins: [
        {src: '~/plugins/element-ui', ssr: true},
        {src: '~/plugins/vue-quill-editor.js', ssr: false},
        {src: '~/plugins/vue-highlight.js', ssr: true},
        {src: '~/plugins/vue-event-calendar.js', ssr: false}
    ],
    css: [
        'static/css/reset.css',
        'static/css/public.css',
        'element-ui/lib/theme-chalk/base.css',
        'element-ui/lib/theme-chalk/carousel.css',
        'element-ui/lib/theme-chalk/carousel-item.css',
        'element-ui/lib/theme-chalk/input.css',
        'element-ui/lib/theme-chalk/button.css'
    ],
    transition: {name: 'page'}
};
