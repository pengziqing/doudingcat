<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color
            text-color="rgb(65, 80, 88)"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import { getAuthUserDetai } from '@/api/draw';
export default {
    data() {
        return {
            collapse: false,
            // items: [
            //     {
            //         icon: 'el-icon-rank',
            //         index: '1',
            //         title: '数据统计',
            //         subs: [
            //             {
            //                 index: 'layoutData',
            //                 title: '布局数据'
            //             },
            //             {
            //                 index: 'useSituation',
            //                 title: '使用情况'
            //             },
            //             {
            //                 index: 'useDetails',
            //                 title: '使用明细'
            //             },
            //             {
            //                 index: 'accessDetails',
            //                 title: '访问明细'
            //             },
            //             {
            //                 index: 'communityRanking',
            //                 title: '社区使用排行'
            //             },
            //             {
            //                 index: 'appRanking',
            //                 title: '应用使用排行'
            //             }
            //         ]
            //     },
            //     {
            //         icon: 'el-icon-lx-calendar',
            //         index: '2',
            //         title: '应用管理',
            //         subs: [
            //             {
            //                 index: 'releaseApp',
            //                 title: '升级管理'
            //             },
            //             {
            //                 index: 'application',
            //                 title: '应用'
            //             },
            //             {
            //                 index: 'property',
            //                 title: '物业应用'
            //             },
            //             {
            //                 index: 'horizon',
            //                 title: '视界'
            //             }
            //         ]
            //     }
            // ]
            items: [
                {
                    icon: 'el-icon-rank',
                    index: '1',
                    title: '数智面板',
                    subs: [
                        {
                            index: 'layoutData',
                            title: '首页'
                        },
                        {
                            index: 'useSituation',
                            title: '今日运营数据'
                        },
                        {
                            index: 'useDetails',
                            title: '系统运营周报'
                        },
                        {
                            index: 'accessDetails',
                            title: '用户散布图'
                        },
                        {
                            index: 'communityRanking',
                            title: '用户热衰图'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        var formData = new FormData();
        formData.append(
            'body',
            JSON.stringify({
                id: window.localStorage.getItem('user_id'),
                appDevice: { qdDevice: 'Chrome', qdPlatform: 'Win32', qdVersion: '1.0.0' }
            })
        );
        // getAuthUserDetai(formData).then(res => {
        //     if (res.code == 200) {
        //         if (res.data.pList.length > 0) {
        //             this.items[1].subs.splice(1, 1);
        //         } else {
        //             this.items[1].subs.splice(2, 1);
        //         }
        //     }
        // });
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 47px;
    bottom: 0;
    overflow-y: scroll;
    border: 1px solid #f5f3fb;
    z-index: 999;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 218px;
    background: #f5f3fb;
}
.sidebar > ul {
    height: 100%;
}
li.el-menu-item {
    background: #f5f3fb;
    font-size: 14px;
}
</style>
