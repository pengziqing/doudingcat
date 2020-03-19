<template>
    <div class="layoutData">
        <div style="float: left">
            <h6 class="element-header">历史数据概览</h6>
            <div class="card" style="overflow: hidden;">
                <ul>
                    <li v-for="item in cardList">
                        <p class="label">{{item.label}}</p>
                        <p class="value">
                            <span
                                style="color: #047bf8;"
                            >{{parseInt((item.value)/1000) > 0?parseInt((item.value)/1000) + ',':''}}</span>
                            {{item.value%1000}}
                        </p>
                    </li>
                </ul>
            </div>
            <div style="margin-top: 25px;width: 742px;overflow: hidden;">
                <div style="float: left;width: 364px;">
                    <h6 class="element-header">
                        最新订单
                        <el-select
                            v-model="value"
                            placeholder="请选择"
                            style="float: right;width: 100px;"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </h6>
                    <div class="cardContent">
                        <el-table :data="tableData">
                            <el-table-column prop="userName" label="用户"></el-table-column>
                            <el-table-column prop="orderName" label="订购服务"></el-table-column>
                            <el-table-column prop="orderStatus" label="状态" width="60px"></el-table-column>
                            <el-table-column prop="orderPrice" label="金额" width="60px"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div style="float: right;width: 364px;">
                    <h6 class="element-header">
                        销售地区分布
                        <el-select
                            v-model="value2"
                            placeholder="请选择"
                            style="float: right;width: 100px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </h6>
                    <div class="cardContent">
                        <div style="margin-bottom: 20px;">
                            <div style="margin-bottom: 5px">
                                <span>华北</span>
                                <span style="float: right;color:#0083FEFF">北京/天津</span>
                            </div>
                            <!-- <el-progress :percentage="50" :show-text="false"></el-progress> -->
                            <div
                                style="width:100%;height:4px;
                            position:relative;
background:rgba(242,242,242,1);
border-radius:2px;"
                            >
                                <div
                                    style="width:100px;height:4px; position:absolute; z-index: 99;
background:#1462C6FF;
border-radius:2px;"
                                ></div>
                                <div
                                    style="width:180px;height:4px;  position:absolute; z-index: 89;
background:#66B0FEFF;
border-radius:2px;"
                                ></div>
                            </div>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <div style="margin-bottom: 5px">
                                <span>华中</span>
                                <span style="float: right;color:#0083FEFF">上海/杭州</span>
                            </div>
                            <!-- <el-progress :percentage="50" :show-text="false"></el-progress> -->
                            <div
                                style="width:100%;height:4px;
                            position:relative;
background:rgba(242,242,242,1);
border-radius:2px;"
                            >
                                <div
                                    style="width:60px;height:4px; position:absolute; z-index: 99;
background:#1462C6FF;
border-radius:2px;"
                                ></div>
                                <div
                                    style="width:90px;height:4px;  position:absolute; z-index: 89;
background:#66B0FEFF;
border-radius:2px;"
                                ></div>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <div style="margin-bottom: 5px">
                                <span>华西</span>
                                <span style="float: right;color:#0083FEFF">重庆/成都</span>
                            </div>
                            <!-- <el-progress :percentage="50" :show-text="false"></el-progress> -->
                            <div
                                style="width:100%;height:4px;
                            position:relative;
background:rgba(242,242,242,1);
border-radius:2px;"
                            >
                                <div
                                    style="width:110px;height:4px; position:absolute; z-index: 99;
background:#1462C6FF;
border-radius:2px;"
                                ></div>
                                <div
                                    style="width:160px;height:4px;  position:absolute; z-index: 89;
background:#66B0FEFF;
border-radius:2px;"
                                ></div>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <div style="margin-bottom: 5px">
                                <span>华南</span>
                                <span style="float: right;color:#0083FEFF">深圳/广州</span>
                            </div>
                            <!-- <el-progress :percentage="50" :show-text="false"></el-progress> -->
                            <div
                                style="width:100%;height:4px;
                            position:relative;
background:rgba(242,242,242,1);
border-radius:2px;"
                            >
                                <div
                                    style="width:70px;height:4px; position:absolute; z-index: 99;
background:#1462C6FF;
border-radius:2px;"
                                ></div>
                                <div
                                    style="width:130px;height:4px;  position:absolute; z-index: 89;
background:#66B0FEFF;
border-radius:2px;"
                                ></div>
                            </div>
                        </div>
                        <div id="main" style="width: 100%;height:100px;"></div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 25px;width: 742px;overflow: hidden;">
                <div style="float: left;">
                    <h6 class="element-header">设备活跃态势图</h6>
                    <div style="width: 490px;background: #fff;">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="在线量" name="first">
                                <div
                                    id="mains"
                                    style="width: 380px;height:100px;margin-left: 60px;"
                                ></div>
                            </el-tab-pane>
                            <el-tab-pane label="离线量" name="second">
                                <div
                                    id="mainss"
                                    style="width: 380px;height:100px;margin-left: 60px;"
                                ></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div style="float: right;width: 238px;">
                    <h6 class="element-header">设备型号</h6>
                    <div style="width: 238px;height:226px;background: #fff;">
                        <div id="mainCircle" style="width: 238px;height:146px;"></div>
                        <ul class="chartPie">
                            <li>
                                <span
                                    style="display:inline-block;width: 4px;
      height: 4px;
      background: #91c7ae;
      border-radius: 50%;
      position: relative;
      top: -2px;
      border: 1px solid #91c7ae;"
                                ></span>
                                Z9
                                <span
                                    style="color:rgba(90, 99, 126, 0.49)"
                                >1%, 12台</span>
                            </li>
                            <li>
                                <span
                                    style="display:inline-block;width: 4px;
      height: 4px;
      background: #d48265;
      border-radius: 50%;
      position: relative;
      top: -2px;
      border: 1px solid #d48265;"
                                ></span>
                                QH102
                                <span
                                    style="color:rgba(90, 99, 126, 0.49)"
                                >1%, 12台</span>
                            </li>
                            <li>
                                <span
                                    style="display:inline-block;width: 4px;
      height: 4px;
      background: #61a0a8 ;
      border-radius: 50%;
      position: relative;
      top: -2px;
      border: 1px solid #61a0a8;"
                                ></span>
                                Z7
                                <span
                                    style="color:rgba(90, 99, 126, 0.49)"
                                >1%, 12台</span>
                            </li>
                            <li>
                                <span
                                    style="display:inline-block;width: 4px;
      height: 4px;
      background: #2f4554 ;
      border-radius: 50%;
      position: relative;
      top: -2px;
      border: 1px solid #2f4554;"
                                ></span>
                                QH102L
                                <span
                                    style="color:rgba(90, 99, 126, 0.49)"
                                >1%, 12台</span>
                            </li>
                            <li>
                                <span
                                    style="display:inline-block;width: 4px;
      height: 4px;
      background: #c23531;
      border-radius: 50%;
      position: relative;
      top: -2px;
      border: 1px solid #c23531;"
                                ></span>
                                Z4
                                <span
                                    style="color:rgba(90, 99, 126, 0.49)"
                                >1%, 12台</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div style="float:left;margin-left: 30px;width: 238px;">
            <h6 class="element-header">快捷功能</h6>
            <p>
                <img
                    src="../../../css/images/button1.png"
                    alt
                    style="width: 118px;height:24px; cursor:pointer"
                    @click="dialogVisible = true"
                />

                <img
                    src="../../../css/images/button2.png"
                    alt
                    style="width: 118px;height:24px;cursor:pointer"
                    @click="dialogVisible = true"
                />
            </p>
            <br />
            <br />
            <h6 class="element-header" style="margin-bottom: 0">活跃社区</h6>
            <div
                style="width: 100%;height: 138px;border-bottom: 1px solid rgba(229,231,235,1);margin-top: 1rem"
            >
                <div style="float: left;background: #fff;padding: 10px 5px;">
                    <img
                        src="../../../css/images/community1.png"
                        alt
                        style="width: 71px; height:64px;"
                    />
                    <div
                        style="border-top: 1px solid rgba(229,231,235,1);font-size:12px;text-align:center;padding-top: 5px;
color:rgba(102,102,102,1);"
                    >重庆江与城</div>
                </div>
                <div style="float: left;margin-left:12px;padding-top: 8px">
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >使用总次数：1190</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >在线总时长：2.3万小时</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >消费总次数：53,234</span>
                    <br />
                </div>
            </div>
            <div
                style="width: 100%;height: 138px;border-bottom: 1px solid rgba(229,231,235,1);margin-top: 1rem"
            >
                <div style="float: left;background: #fff;padding: 10px 5px;">
                    <img
                        src="../../../css/images/community2.png"
                        alt
                        style="width: 71px; height:64px;"
                    />
                    <div
                        style="border-top: 1px solid rgba(229,231,235,1);font-size:12px;text-align:center;padding-top: 5px;
color:rgba(102,102,102,1);"
                    >北京长楹天街</div>
                </div>
                <div style="float: left;margin-left:12px;padding-top: 8px">
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >使用总次数：1190</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >在线总时长：2.3万小时</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >消费总次数：53,234</span>
                    <br />
                </div>
            </div>
            <div
                style="width: 100%;height: 138px;border-bottom: 1px solid rgba(229,231,235,1);margin-top: 1rem"
            >
                <div style="float: left;background: #fff;padding: 10px 5px;">
                    <img
                        src="../../../css/images/community3.png"
                        alt
                        style="width: 71px; height:64px;"
                    />
                    <div
                        style="border-top: 1px solid rgba(229,231,235,1);font-size:12px;text-align:center;padding-top: 5px;
color:rgba(102,102,102,1);"
                    >重庆江与城</div>
                </div>
                <div style="float: left;margin-left:12px;padding-top: 8px">
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >使用总次数：1190</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >在线总时长：2.3万小时</span>
                    <br />
                    <span
                        style="
font-size:12px;
color:rgba(153,153,153,1);
line-height:32px;"
                    >消费总次数：53,234</span>
                    <br />
                </div>
            </div>
            <br />
            <br />
            <h6 class="element-header">活跃用户</h6>
            <div style="margin-bottom: 12px;overflow:hidden;">
                <div style="float: left;">
                    <img
                        src="../../../css/images/avatar1.png"
                        alt
                        style="width: 48px; height: 48px;border-radius: 24px;"
                    />
                </div>
                <div
                    style="float: left;margin-left: 14px;color:#333333FF;font-size:12px;padding-top:6px;"
                >
                    <span>蒋先生</span>
                    <br />
                    <span style="color:#999999FF">重庆江与城 A项目</span>
                </div>
                <div style="float: right;">
                    <img src="../../../css/images/envelope.png" alt />
                </div>
            </div>
            <div style="margin-bottom: 12px;overflow:hidden;">
                <div style="float: left;">
                    <img
                        src="../../../css/images/avatar2.png"
                        alt
                        style="width: 48px; height: 48px;border-radius: 24px;"
                    />
                </div>
                <div
                    style="float: left;margin-left: 14px;color:#333333FF;font-size:12px;padding-top:6px;"
                >
                    <span>蒋先生</span>
                    <br />
                    <span style="color:#999999FF">重庆江与城 A项目</span>
                </div>
                <div style="float: right;">
                    <img src="../../../css/images/envelope.png" alt />
                </div>
            </div>
            <div style="margin-bottom: 12px;overflow:hidden;">
                <div style="float: left;">
                    <img
                        src="../../../css/images/avatar3.png"
                        alt
                        style="width: 48px; height: 48px;border-radius: 24px;"
                    />
                </div>
                <div
                    style="float: left;margin-left: 14px;color:#333333FF;font-size:12px;padding-top:6px;"
                >
                    <span>蒋先生</span>
                    <br />
                    <span style="color:#999999FF">重庆江与城 A项目</span>
                </div>
                <div style="float: right;">
                    <img src="../../../css/images/envelope.png" alt />
                </div>
            </div>
        </div>
        <el-dialog title="提示" :center="true" :visible.sync="dialogVisible" width="30%">
            <div style="text-align: center;">开发中</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div style="clear: both;height: 100px;"></div>
    </div>
</template>

<script>
import {} from '@/api/draw';

export default {
    name: 'layoutData',
    data() {
        return {
            activeName: 'first',
            tableData: [
                {
                    cityCode: '212',
                    cityName: '深圳市',
                    orderId: 'bc0a587cd56f4240bf344e678c29930e',
                    orderName: '保洁服务',
                    orderPrice: '354.0',
                    orderStatus: '待支付',
                    projectId: 'f05f3044c0c94801a24ba3e3bb3a2fc2',
                    projectName: '龙湖冠寓深圳大浪商业中心店',
                    provinceCode: '19',
                    provinceName: '广东省',
                    userId: 'meb22ec978a011e58a30418500332836',
                    userName: '刘先生'
                },
                {
                    cityCode: '5',
                    cityName: '成都市',
                    orderId: '00006b0ebbc54c1c9d3cee6459154ee5',
                    orderName: '订购大米',
                    orderPrice: '188.0',
                    orderStatus: '待支付',
                    projectId: '1e6fc7831ab04c9185b0af2cbb6c038c',
                    projectName: '世纪峰景',
                    provinceCode: '已支付',
                    provinceName: '四川省',
                    userId: 'meb22ec978a011e58a30418500332836',
                    userName: '林先生'
                },
                {
                    cityCode: '9',
                    cityName: '上海市',
                    orderId: '000128aec8a142b0a7d0e8616e1c09ef',
                    orderName: '保洁服务',
                    orderPrice: '188.0',
                    orderStatus: '已支付',
                    projectId: 'f625ccde43f44f9d83da2daada36b2ef',
                    projectName: '景舒苑-三村',
                    provinceCode: '9',
                    provinceName: '上海市',
                    userId: '000128aec8a142b0a7d0e8616e1c09ef',
                    userName: '陈小姐'
                },
                {
                    cityCode: '1',
                    cityName: '北京市',
                    orderId: '000215c47cd546468c152307daef281e',
                    orderName: '除螨服务',
                    orderPrice: '188.0',
                    orderStatus: '已支付',
                    projectId: '377891196d3c4b91bf6a821a765d29cc',
                    projectName: '北京香醍漫步',
                    provinceCode: '1',
                    provinceName: '北京市',
                    userId: '000128aec8a142b0a7d0e8616e1c09ef',
                    userName: '李小姐'
                },
                {
                    cityCode: '3',
                    cityName: '重庆市',
                    orderId: '000304269ff240d581f59b45c61fb765',
                    orderName: '订购儿童教育',
                    orderPrice: '1120.0',
                    orderStatus: '已支付',
                    projectId: '1524ed23ddae4cea9ce4c5b7a1be1c10',
                    projectName: '重庆U城北区星座',
                    provinceCode: '22',
                    provinceName: '重庆市',
                    userId: '000128aec8a142b0a7d0e8616e1c09ef',
                    userName: '王小姐'
                },
                {
                    cityCode: '1',
                    cityName: '北京市',
                    orderId: '000215c47cd546468c152307daef281e',
                    orderName: '除螨服务',
                    orderPrice: '188.0',
                    orderStatus: '已取消',
                    projectId: '377891196d3c4b91bf6a821a765d29cc',
                    projectName: '北京香醍漫步',
                    provinceCode: '1',
                    provinceName: '北京市',
                    userId: '000128aec8a142b0a7d0e8616e1c09ef',
                    userName: '张小姐'
                },
                {
                    cityCode: '9',
                    cityName: '上海市',
                    orderId: '000128aec8a142b0a7d0e8616e1c09ef',
                    orderName: '保洁服务',
                    orderPrice: '188.0',
                    orderStatus: '已取消',
                    projectId: 'f625ccde43f44f9d83da2daada36b2ef',
                    projectName: '景舒苑-三村',
                    provinceCode: '9',
                    provinceName: '上海市',
                    userId: '000128aec8a142b0a7d0e8616e1c09ef',
                    userName: '陈先生'
                }
            ],
            dialogVisible: false,
            options: [
                {
                    value: '选项1',
                    label: '今天'
                },
                {
                    value: '选项2',
                    label: '近七天'
                },
                {
                    value: '选项3',
                    label: '近三十天'
                }
            ],
            value: '选项1',
            value2: '选项3',
            cardList: [
                {
                    label: '在线设备',
                    value: '57102'
                },
                {
                    label: '设备激活数',
                    value: '10293'
                },
                {
                    label: '社区数量',
                    value: '2215'
                },
                {
                    label: '城市数量',
                    value: '102'
                }
            ]
        };
    },
    components: {},
    computed: {},
    methods: {
        dialog(val) {
            this.dialogVisible = true;
            if (val == 'show') {
                this.title = '显示数量';
            } else {
                this.title = '隐藏数量';
            }
        }
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            title: {
                text: '销售增长数据',
                textStyle: {
                    //textStyle设置标题样式
                    color: '#0083FEFF',
                    fontWeight: 'bold',
                    fontSize: 12
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '-13%',
                right: '0',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false //去掉x轴刻度线
                },
                itemStyle: {
                    normal: {
                        color: '#8cd5c2', //改变折线点的颜色
                        lineStyle: {
                            color: '#8cd5c2' //改变折线颜色
                        }
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#00000073',
                        width: 1 //这里是为了突出显示加上的
                    }
                },

                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    //分割线
                    show: false //控制分割线是否显示
                },
                axisLine: {
                    //y轴不显示
                    show: false
                },
                axisTick: {
                    //y轴刻度线不显示
                    show: false
                },
                axisLabel: {
                    color: '#fff', //刻度线标签颜色
                    fontSize: 14
                }
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 934, 1290, 1330, 1320, 1320],
                    type: 'line',
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: '#5B8FF9FF', //改变折线点的颜色
                            width: '10px',

                            lineStyle: {
                                color: '#5B8FF9FF' //改变折线颜色
                            }
                        }
                    }
                    // axisLine: {
                    //     lineStyle: {
                    //         color: '#5B8FF9FF',
                    //         width: 1 //这里是为了突出显示加上的
                    //     }
                    // },
                }
            ]
        };
        myChart.setOption(option);
        var myCharts = echarts.init(document.getElementById('mains'));
        var options = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '-13%',
                right: '0',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                splitLine: {
                    //分割线
                    show: false //控制分割线是否显示
                },
                axisLine: {
                    //y轴不显示
                    show: false
                },
                axisTick: {
                    //y轴刻度线不显示
                    show: false
                },
                axisLabel: {
                    color: '#fff', //刻度线标签颜色
                    fontSize: 14
                },
                type: 'category',
                axisTick: {
                    show: false //去掉x轴刻度线
                },
                itemStyle: {
                    normal: {
                        color: '#8cd5c2', //改变折线点的颜色
                        lineStyle: {
                            color: '#8cd5c2' //改变折线颜色
                        }
                    }
                },

                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    //分割线
                    show: false //控制分割线是否显示
                },
                axisLine: {
                    //y轴不显示
                    show: false
                },
                axisTick: {
                    //y轴刻度线不显示
                    show: false
                },
                axisLabel: {
                    color: '#fff', //刻度线标签颜色
                    fontSize: 14
                }
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 30, 1320, 934, 1390, 1330, 1320, 1320],
                    type: 'line',
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: '#000', //改变折线点的颜色
                            width: '10px',

                            lineStyle: {
                                color: '#5B8FF9FF' //改变折线颜色
                            }
                        }
                    }
                    // axisLine: {
                    //     lineStyle: {
                    //         color: '#5B8FF9FF',
                    //         width: 1 //这里是为了突出显示加上的
                    //     }
                    // },
                }
            ]
        };
        myCharts.setOption(options);
        var myChartss = echarts.init(document.getElementById('mainss'));
        var optionss = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '-13%',
                right: '0',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                splitLine: {
                    //分割线
                    show: false //控制分割线是否显示
                },
                axisLine: {
                    //y轴不显示
                    show: false
                },
                axisTick: {
                    //y轴刻度线不显示
                    show: false
                },
                axisLabel: {
                    color: '#fff', //刻度线标签颜色
                    fontSize: 14
                },
                type: 'category',
                axisTick: {
                    show: false //去掉x轴刻度线
                },
                itemStyle: {
                    normal: {
                        color: '#8cd5c2', //改变折线点的颜色
                        lineStyle: {
                            color: '#8cd5c2' //改变折线颜色
                        }
                    }
                },

                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    //分割线
                    show: false //控制分割线是否显示
                },
                axisLine: {
                    //y轴不显示
                    show: false
                },
                axisTick: {
                    //y轴刻度线不显示
                    show: false
                },
                axisLabel: {
                    color: '#fff', //刻度线标签颜色
                    fontSize: 14
                }
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 30, 1320, 934, 1390, 1330, 1320, 1320],
                    type: 'line',
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: '#000', //改变折线点的颜色
                            width: '10px',

                            lineStyle: {
                                color: '#5B8FF9FF' //改变折线颜色
                            }
                        }
                    }
                    // axisLine: {
                    //     lineStyle: {
                    //         color: '#5B8FF9FF',
                    //         width: 1 //这里是为了突出显示加上的
                    //     }
                    // },
                }
            ]
        };
        myChartss.setOption(optionss);

        var myChartsss = echarts.init(document.getElementById('mainCircle'));
        var optionsss = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            // legend: {
            //     orient: 'vertical',

            //     left: 'center',
            //     width: 200,
            //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            // },
            graphic: {
                //图形中间文字
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: '5种型号',
                    textAlign: 'center',
                    fill: '#333333FF',
                    fontSize: 16
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ]
                }
            ]
        };

        myChartsss.setOption(optionsss);
    }
};
</script>


<style scoped>
.cardContent {
    background: #fff;
    padding: 20px;
    font-size: 12px;
}
.element-header {
    font-size: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    position: relative;
}
.element-header:after {
    content: '';
    background-color: #047bf8;
    width: 25px;
    height: 4px;
    border-radius: 0px;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0px;
}
.card ul li {
    list-style: none;
    float: left;
    width: 144px;
    height: 64px;
    padding: 1rem;
    border-radius: 6px;
    background-color: #fff;
    -webkit-box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
    box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
    margin-right: 12px;
}
.card .label {
    display: block;
    font-size: 0.63rem;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
}
.card .value {
    font-size: 2.43rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1.4;
    display: inline-block;
    vertical-align: middle;
}
</style>
<style>
.layoutData input.el-input__inner {
    border-radius: 12px;
    background: transparent;
    height: 24px;
    line-height: 24px;
}
.layoutData .el-select .el-input.is-focus .el-input__inner,
.layoutData .el-select .el-input__inner:focus {
    border: 1px solid #c0c4cc;
}
.layoutData .el-input--small .el-input__icon {
    height: 24px;
    line-height: 24px;
}
.layoutData .el-table thead {
    color: #333333ff;
}
.layoutData div#tab-first,
.layoutData .el-tabs__active-bar.is-top {
    margin-left: 40px;
}

.chartPie {
    margin-left: 25px;
}
.chartPie li {
    list-style: none;
    float: left;
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    margin-right: 5px;
    font-weight: bold;
    margin-right: 10px;
}
</style>