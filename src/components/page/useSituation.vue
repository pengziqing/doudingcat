<template>
    <div class="useSituation">
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
                        <span>使用情况</span>
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
                            ></el-date-picker>
                            <el-radio-group v-model="radio1" style="margin: 0px 20px;">
                                <el-radio-button label="时"></el-radio-button>
                                <el-radio-button label="周"></el-radio-button>
                                <el-radio-button label="月"></el-radio-button>
                            </el-radio-group>
                            <el-button type="primary">查询</el-button>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>
                                活跃人数
                                <p>25</p>
                            </li>
                            <li>
                                未活跃数
                                <p>25</p>
                            </li>
                            <li>
                                使用率
                                <p>25%</p>
                            </li>
                            <li>
                                访问次数（PV）
                                <p>25</p>
                            </li>
                            <li>
                                平均访问时长
                                <p>00:04:17</p>
                            </li>
                            <li>
                                新增用户数
                                <p>25</p>
                            </li>
                            <li>
                                留存率
                                <p>25%</p>
                            </li>
                        </ul>
                    </div>
                    <div
                        id="main"
                        style="width: 100%;height:500px; overflow: hidden;clear: both;margin-top: 100px;"
                    ></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import {} from '@/api/draw';
// import echart from 'echart';
export default {
    name: 'useSituation',
    data() {
        return {
            radio1: '周',
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
    mounted() {
        this.valueDate =  [new Date(), new Date()]
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            legend: {
                data: ['活跃人数', '访问次数']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%'
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '活跃人数',
                    type: 'line',

                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '访问次数',
                    type: 'line',

                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
};
</script>


<style scoped>
.useSituation ul li {
    list-style: none;
    float: left;
    margin: 15px 15px;
    padding-right: 15px;
    border-right: 1px dashed #ccc;
}
.useSituation ul li:last-child {
    border-right: none;
}
.useSituation ul li p {
    margin-top: 10px;
}
</style>