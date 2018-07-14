<template>
    <div class="diary">
        <div class="container">
            <vue-event-calendar :title="title" :events="currMonthEvents" @month-changed="handleMonthChanged"></vue-event-calendar>
        </div>
    </div>
</template>

<script>
    import {blog_name} from '~/config/blog_config'

    export default {
        name: "diary",
        head() {
            return {
                title: `随记 - ${blog_name}`,
                meta: [
                    {hid: 'description', name: 'description', content: `${blog_name}, 随记, 个人日记`},
                    {hid: 'keyword', name: 'keyword', content: `${blog_name}, 随记, 个人日记`}
                ]
            }
        },
        asyncData({app}) {
            let currMonthEvents = [];
            let params = {
                month: new Date().toLocaleDateString()
            };
            return app.$axios.$get('/api/diary/getDiaryByMonth', {params}).then((res) => {
                if (res.code === 200) {
                    res.data.map((item) => {
                        item.desc = item.description;
                    });
                    currMonthEvents = res.data;
                }
                return {currMonthEvents, title: res.data.length ? `随记（本月）` : `暂无随记（本月）`};
            });
        },
        methods: {
            handleMonthChanged(month) {
                this.title = `随记（${month}）`;
                let params = {
                    month: month.replace('年', '-').replace('月', '') + '-01'
                };
                this.$axios.$get('/api/diary/getDiaryByMonth', {params}).then((res) => {
                    if (res.code === 200) {
                        res.data.map((item) => {
                            item.desc = item.description;
                        });
                        if (res.data.length === 0) {
                            this.title = `暂无随记（${month}）`;
                        }
                        this.currMonthEvents = res.data;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .diary {
        padding: 6px 0;
        .container {
            min-height: calc(100vh - 132px);
            padding: 10px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            display: flex;
            .__vev_calendar-wrapper .events-wrapper .event-item .desc {
                text-indent: 2em;
                line-height: 20px;
            }
            .__vev_calendar-wrapper .events-wrapper .date {
                max-width: 70%;
                padding: 6px 0;
                font-size: 18px;
            }
        }
    }
</style>
