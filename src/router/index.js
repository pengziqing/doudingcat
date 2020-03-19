import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/layoutData'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/layoutData',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/layoutData.vue'),
                    meta: { title: '数智面板 / 首页' }
                },
                {
                    path: '/useSituation',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/useSituation.vue'),
                    meta: { title: '数智面板 / 今日运营数据' }
                },
                {
                    path: '/useDetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/useDetails.vue'),
                    meta: { title: '数智面板 / 系统运营周报' }
                },
                {
                    path: '/accessDetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/accessDetails.vue'),
                    meta: { title: '数智面板 / 用户散布图' }
                },
                {
                    path: '/appRanking',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/appRanking.vue'),
                    meta: { title: '数智面板 / 应用使用排行' }
                },
                {
                    path: '/communityRanking',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/communityRanking.vue'),
                    meta: { title: '数智面板 / 用户热衰图' }
                },
               
                {
                    path: '/releaseApp',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/releaseApp.vue'),
                    meta: { title: '升级管理' }
                },
                {
                    path: '/application',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/application.vue'),
                    meta: { title: '应用' }
                },
                {
                    path: '/property',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/property.vue'),
                    meta: { title: '物业应用' }
                },
                {
                    path: '/horizon',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/horizon.vue'),
                    meta: { title: '视界' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
