<template>
    <div class="layoutData">
        <h6 class="element-header">用户散布图</h6>
        <div id="container" class="map"  style="width: 800px; height: 660px;">
            <div style="width: 800px; height: 660px;background: #fff"></div>
        </div>
        <div class="card"> 
            <ul>
                <li></li>
                 <li></li>
                  <li></li>
                   <li></li>
                </ul>  </div>
    </div>
</template>

<script>
import {} from '@/api/draw';

export default {
    name: 'layoutData',
    data() {
        return {};
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
    methods: {},
    mounted() {
        var SOC = 'CHN';
        var colors = {};
        var GDPSpeed = {
            '520000': 10, //贵州
            '540000': 10, //西藏
            '530000': 8.5, //云南
            '500000': 8.5, //重庆
            '360000': 8.5, //江西
            '340000': 8.0, //安徽
            '510000': 7.5, //四川
            '350000': 8.5, //福建
            '430000': 8.0, //湖南
            '420000': 7.5, //湖北
            '410000': 7.5, //河南
            '330000': 7.0, //浙江
            '640000': 7.5, //宁夏
            '650000': 7.0, //新疆
            '440000': 7.0, //广东
            '370000': 7.0, //山东
            '450000': 7.3, //广西
            '630000': 7.0, //青海
            '320000': 7.0, //江苏
            '140000': 6.5, //山西
            '460000': 7, // 海南
            '310000': 6.5, //上海
            '110000': 6.5, // 北京
            '130000': 6.5, // 河北
            '230000': 6, // 黑龙江
            '220000': 6, // 吉林
            '210000': 6.5, //辽宁
            '150000': 6.5, //内蒙古
            '120000': 5, // 天津
            '620000': 6, // 甘肃
            '610000': 8.5, // 甘肃
            '710000': 2.64, //台湾
            '810000': 3.0, //香港
            '820000': 4.7 //澳门
        };
        var getColorByDGP = function(adcode) {
            if (!colors[adcode]) {
                var gdp = GDPSpeed[adcode];
                if (!gdp) {
                    colors[adcode] = 'rgb(255,255,255)';
                } else {
                    var r = 3;
                    var g = 140;
                    var b = 230;
                    var a = gdp / 10;
                    colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
                }
            }
            return colors[adcode];
        };

        var disCountry = new AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: 'CHN',
            depth: 1,
            styles: {
                'nation-stroke': '#ff6600',
                'coastline-stroke': 'ff8800',
                'province-stroke': 'white',
                fill: function(props) {
                    return getColorByDGP(props.adcode_pro);
                }
            }
        });

        var map = new AMap.Map('container', {
            zooms: [4, 10],
            center: [106.122082, 33.719192],
            zoom: 4,
             mapStyle: 'amap://styles/fc3284054b1c8f3ff9f3e3e0ea0bdcec',
            isHotspot: false,
            defaultCursor: 'pointer',
            layers: [disCountry],
            viewMode: '2D',
            resizeEnable: true
        });
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar({ liteStyle: true }));
        map.on('complete', function() {
            var layer = new AMap.LabelsLayer({
                // 开启标注避让，默认为开启，v1.4.15 新增属性
                collision: false,
                // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
                animation: true
            });
            for (var i = 0; i < LabelsData.length; i++) {
                var labelsMarker = new AMap.LabelMarker(LabelsData[i]);
                layer.add(labelsMarker);
            }
            map.add(layer);
        });
    }
};
</script>


<style scoped>
.layoutData {
    padding: 2rem 2.5rem;
    padding: 1px solid red;
}
.element-header {
    font-size: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 1rem;
    margin-bottom: 2rem;
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

</style>