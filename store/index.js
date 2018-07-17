import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        individuationData: {},
        businessCardData: {},
        articleTotal: 0,
        labelTotal: 0,
        labelList: [],
        recommendList: []
    },
    mutations: {
        setIndividuationData(state, data) {
            state.individuationData = data;
        },
        setBusinessCardData(state, data) {
            state.businessCardData = data;
        },
        setArticleTotal(state, num) {
            state.articleTotal = num;
        },
        setLabelList(state, data) {
            state.labelList = data;
        },
        setLabelTotal(state, num) {
            state.labelTotal = num;
        },
        setRecommendList(state, data) {
            state.recommendList = data;
        }
    },
    actions: {
        async nuxtServerInit({commit}, {app}) {
            // 个性化数据
            let res = await app.$axios.$get('/api/individuation/getIndividuation');
            commit('setIndividuationData', res.data);
            let businessCardData = {
                portrait: res.data.portrait,
                nickname: res.data.nickname,
                self_intro: res.data.self_intro
            };
            // 名片
            commit('setBusinessCardData', businessCardData);
            // 文章数
            res = await app.$axios.$get('/api/article/getArticleTotal');
            commit('setArticleTotal', res.data);
            // 标签数据
            res = await app.$axios.$get('/api/label/getLabelList');
            commit('setLabelList', res.data);
            commit('setLabelTotal', res.data.length);
            // 推荐文章
            res = await app.$axios.$get('/api/article/getArticleList', {params: {isOnlyTop: true}});
            commit('setRecommendList', res.data);
        }
    }
});

export default store;
