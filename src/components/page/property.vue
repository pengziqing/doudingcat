<template>
    <div class="useDetails">
        <div>
            <h2>应用</h2>
            <br />
            <div>
                社区：
                <el-select v-model="pListVal" placeholder="请选择">
                    <el-option
                        v-for="item in pList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <span style="margin-left: 50px;">应用状态：</span>
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>

                <el-button type="primary" style="margin-left: 50px;" @click="selectFn">查询</el-button>
            </div>
            <br />

            <div class="text item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="图标">
                        <template slot-scope="scope">
                            <img :src="scope.row.iconUrl" width="192" height="120" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名字"></el-table-column>
                    <el-table-column prop="intro" label="说明"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-switch
                                @change="viewFn(scope.row)"
                                v-model="scope.row.status == 0? true: false"
                            ></el-switch>
                            <!-- <el-button
                                type="text"
                                size="small"
                                @click="viewFn(scope.row)"
                            >{{scope.row.status == 0?'显示': '隐藏'}}</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { getAppListByProjectId, showHiddenApp, getAuthUserDetai } from '@/api/draw';

export default {
    name: 'useDetails',
    data() {
        return {
            pListVal: '',
            pList: [],
            projectId: '',
            switthVal: false,
            value: '',
            options: [
                {
                    value: '0',
                    label: '显示'
                },
                {
                    value: '1',
                    label: '隐藏'
                }
            ],

            tableData: []
        };
    },
    components: {},
    computed: {},
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        selectFn(val) {
            this.getAppListByProjectId(this.value, this.pListVal);
        },
        viewFn(val) {
            var formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    id: val.id,
                    projectId: this.pListVal,
                    status: val.status == 0 ? 1 : 0
                })
            );
            showHiddenApp(formData).then(res => {
                if (res.code == 200) {
                    this.getAppListByProjectId();
                }
            });
        },
        getAppListByProjectId(type) {
            var formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    projectId: this.pListVal,
                    status: type
                })
            );
            getAppListByProjectId(formData).then(res => {
                this.tableData = res.data.appList;
                this.total = res.data.total;
            });
        }
    },
    mounted() {
        var formData = new FormData();
        formData.append(
            'body',
            JSON.stringify({
                id: window.localStorage.getItem('user_id'),
                // id: '8aa573016cff94ac016f1cb941083147',
                appDevice: { qdDevice: 'Chrome', qdPlatform: 'Win32', qdVersion: '1.0.0' }
            })
        );
        getAuthUserDetai(formData).then(res => {
            if (res.code == 200) {
                this.projectId = res.data.projectId;
                this.pList = res.data.pList;
                this.pListVal = res.data.pList[0].id;
                this.getAppListByProjectId();
                console.log('-------ID123456--------');
            }
        });
    }
};
</script>


<style >
</style>