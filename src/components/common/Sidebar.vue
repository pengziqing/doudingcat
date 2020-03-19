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
                            <div>
                                <i
                                    :class="item.icons"
                                    class="ionic"
                                    style="float:left;margin-right: 10px;"
                                ></i>
                                <span slot="title" style="float:left">{{ item.title }}</span>
                                <i :class="item.icon" class="ionic" style="float:right"></i>
                            </div>
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
            isShowList: true,
            collapse: true,
            items: [
                {
                    icons: 'el-icon-bank-card',
                    icon: 'el-icon-arrow-down',
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
                },
                {
                    icons: 'el-icon-takeaway-box',
                    icon: 'el-icon-arrow-down',
                    index: '2',
                    title: '应用管理',
                    subs: [
                        {
                            index: 'releaseApp',
                            title: '升级管理'
                        },
                        {
                            index: 'application',
                            title: '应用'
                        },
                        {
                            index: 'property',
                            title: '物业应用'
                        },
                        {
                            index: 'horizon',
                            title: '视界'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        // outStyle() {
        //     this.isShowList = true;
        //     console.log(val);
        // },
        // show(val) {
        //     this.isShowList = false;
        //     console.log(val);
        // },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }
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
.el-menu--collapse {
    width: 220px;
}
</style>
<style >
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse > .el-submenu > .el-submenu__title span {
    overflow: static;
    visibility: static;
}
li.el-submenu.is-opened,
.el-submenu__title:hover,
li.el-menu-item[data-v-68d67528],
ul.el-menu.el-menu--popup.el-menu--popup-right-start,
.el-menu--vertical {
    background: #0083feff;
    color: rgba(255, 255, 255, 0.87) !important;
}
li.el-menu-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 48px !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    color: rgba(255, 255, 255, 0.87) !important;
    line-height: 48px !important;
}
li.el-menu-item.is-active {
    color: rgba(255, 255, 255, 0.87) !important;
}
.el-submenu__title {
    height: 48px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
}
.el-menu--popup {
    padding: 0;
}
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse > .el-submenu > .el-submenu__title span {
    visibility: visible;
    overflow: visible;
    height: 48px;
}
li.el-submenu.is-opened .el-submenu__title {
    color: rgba(255, 255, 255, 0.87) !important;
}
.sidebar[data-v-68d67528],
.el-menu {
    background: #f5f3fb;
    border-left: none;
}
.el-menu--popup-right-start {
    padding: 0;
}
[class*=' el-icon-'],
[class^='el-icon-'] {
    line-height: 3;
}
li.el-submenu.is-opened .ionic {
    color: #fff;
}
li.el-submenu.is-opened .el-icon-arrow-down {
    transform: rotate(270deg);
}
</style>
