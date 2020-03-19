<template>
    <div class="useDetails">
        <div>
            <div>
                应用：
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <br />
            <div>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>使用日志</span>
                        <br />
                        <br />
                        <div>
                            <span>时间：</span>
                            <el-date-picker
                                v-model="valueDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>&nbsp;&nbsp;
                            <span>访问：</span>
                            <el-select v-model="valueTwo" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in optionsTwo"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>&nbsp;&nbsp;
                            <el-button type="primary" @click="search">查询</el-button>
                            <el-button type="primary">导出</el-button>
                        </div>
                    </div>
                    <div class="text item">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="one" label="社区名"></el-table-column>
                            <el-table-column prop="two" label="房屋"></el-table-column>
                            <el-table-column prop="three" label="访问次数"></el-table-column>
                            <el-table-column prop="four" label="使用时长"></el-table-column>
                            <el-table-column prop="five" label="平均每次时长"></el-table-column>
                            <el-table-column prop="six" label="登录手机号"></el-table-column>
                            <el-table-column prop="seven" label="状态"></el-table-column>
                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="viewFn">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
        </div>
        <el-dialog title="使用日志" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="date" label="访问时间"></el-table-column>
                <el-table-column property="name" label="日志类型"></el-table-column>
                <el-table-column property="address" label="事件名称"></el-table-column>
                <el-table-column property="address" label="日志内容"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {} from '@/api/draw';

export default {
    name: 'useDetails',
    data() {
        return {
            dialogTableVisible: false,
            value: '',
            options: [
                {
                    value: '1',
                    label: '社区广播'
                }
            ],
            optionsTwo: [
                {
                    value: '1',
                    label: '活跃'
                },
                {
                    value: '2',
                    label: '未活跃'
                }
            ],
            valueTwo: '',
            valueDate: '',
            tableData: [
                {
                    one: '北京西局1-2期',
                    two: '12期3栋1单元2304室',
                    three: '33',
                    four: '4小时36分',
                    five: '3分10秒',
                    six: '13612345678',
                    seven: '活跃'
                }
            ]
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
        viewFn() {
            this.dialogTableVisible = true;
        },
        padLeftZero(str) {
            return ('00' + str).substr(str.length);
        },
        formatDate(date, fmt) {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            };
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + '';
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
                }
            }
            return fmt;
        },
        search() {
            console.log(this.formatDate(this.valueDate[0], 'yyyy-MM-dd'), this.formatDate(this.valueDate[1], 'yyyy-MM-dd'));
        }
    },
    mounted() {}
};
</script>


<style >
</style>