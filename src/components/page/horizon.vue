<template>
    <div>
        <div style="float: left" class="block">
            <span class="demonstration">日期：</span>
            <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="screentData"
            ></el-date-picker>
        </div>
        <div style="float: right">
            <el-button type="primary" @click="handleEdit('add')">添加</el-button>
        </div>

        <div style="clear: both; padding-top: 18px;">
            <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="date" label="图片" ></el-table-column> -->
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageUrl" width="192" height="120" />
                    </template>
                </el-table-column>
                <el-table-column prop="intro" label="简介"></el-table-column>
                <!-- <el-table-column prop="status" label="状态"></el-table-column> -->
                <el-table-column prop="dateline" label="发布时间"></el-table-column>
                <!-- <el-table-column prop="address" label="分享预览"></el-table-column> -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit('edit', scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align:center; margin: 50px;">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
        <el-dialog
            title="视界-发布"
            :destroy-on-close="true"
            :visible.sync="dialogVisible"
            @close="fnCancel"
            width="30%"
        >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="上传图片" prop="imageUrl">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                    <el-upload
                        class="avatar-uploader"
                        action="https://upload.qiniup.com"
                        :show-file-list="false"
                        :data="getConfigurationList"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload__tip" slot="tip">图片尺寸要求分辨率为：1920 x 1200</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="上架时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker
                                type="datetime"
                                placeholder="选择日期"
                                v-model="ruleForm.date1"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="资讯简介" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" :rows="8"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="fnCancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleDelete = false">取 消</el-button>
                <el-button type="primary" @click="fnDelete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { activityRule, getConfiguration, createHorizon, deleteHorizon, updateHorizon } from '@/api/draw';

export default {
    name: 'useSituation',
    data() {
        return {
            page: 1,
            total: 0,
            getConfigurationList: {},
            imageUrl: '',
            value1: '',
            tableData: [],
            dialogVisibleDelete: false,
            dialogVisible: false,
            editObj: {
                id: '',
                status: ''
            },
            id: '',
            ruleForm: {
                imageUrl: '',
                region: '',
                date1: '',

                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                imageUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
                date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }],
                desc: [{ required: true, message: '请填写资讯简介', trigger: 'blur' }]
            }
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
        fnCancel() {
            this.dialogVisible = false;
        },
        handleEdit(edit, index, row) {
            this.dialogVisible = true;
            this.editObj.status = edit;
            if (edit == 'edit') {
                this.editObj.id = row.id;
                this.ruleForm.imageUrl = row.imageUrl;
                this.ruleForm.date1 = new Date(row.createTime);
                this.ruleForm.desc = row.intro;
            } else {
                this.ruleForm.imageUrl = '';
                this.ruleForm.date1 = '';
                this.ruleForm.desc = '';
            }
        },
        screentData() {
            if (this.value1) {
                this.getDataList(1, this.formatDate(this.value1[0], 'yyyy-MM-dd'), this.formatDate(this.value1[1], 'yyyy-MM-dd'));
            } else {
                this.getDataList(1);
            }
        },
        handleCurrentChange(val) {
            this.getDataList(val);
        },
        handleDelete(index, row) {
            this.dialogVisibleDelete = true;
            console.log(row);
            this.id = row.id;
        },
        fnDelete() {
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    idList: [this.id]
                })
            );
            deleteHorizon(formData).then(res => {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.dialogVisibleDelete = false;
                this.getDataList();
            });
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
        handleAvatarSuccess(res, file) {
            this.ruleForm.imageUrl = 'http://' + this.getConfigurationList.domain + '/' + res.key;
            console.log(this.ruleForm.imageUrl);
        },
        beforeAvatarUpload(file) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append(
                    'body',
                    JSON.stringify({
                        sysType: 'qdh-external-invocation',
                        fileName: '.png'
                    })
                );

                getConfiguration(formData)
                    .then(res => {
                        this.getConfigurationList.token = res.data.token;
                        this.getConfigurationList.key = res.data.key;
                        this.getConfigurationList.domain = res.data.domain;
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                let formData = new FormData();
               
                if (valid) {
                     if (this.editObj.status == 'edit') {
                    formData.append(
                        'body',
                        JSON.stringify({
                            id: this.editObj.id,
                            dateline: this.formatDate(this.ruleForm.date1, 'yyyy-MM-dd hh:mm:ss'), //页长
                            imageUrl: this.ruleForm.imageUrl, //页码
                            intro: this.ruleForm.desc
                        })
                    );
                        updateHorizon(formData).then(res => {
                        if (res.code == 200) {
                            this.getDataList(1);
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });

                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                        }
                    });
                } else {
                    formData.append(
                        'body',
                        JSON.stringify({                  
                            dateline: this.formatDate(this.ruleForm.date1, 'yyyy-MM-dd hh:mm:ss'), //页长
                            imageUrl: this.ruleForm.imageUrl, //页码
                            intro: this.ruleForm.desc
                        })
                    );
                     createHorizon(formData).then(res => {
                        if (res.code == 200) {
                            this.getDataList(1);
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });

                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                        }
                    });
                }
                   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },
        getDataList(page, start, end) {
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    pageSize: 10, //页长
                    pageNum: page, //页码
                    startDate: start, //开始时间  过滤条件 可选
                    endDate: end, //结束时间 过滤条件 可选
                    status: ''
                })
            );
            activityRule(formData).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.horizonList;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        this.getDataList(this.page);
    }
};
</script>


<style scoped>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 180px;
    line-height: 180px;
    text-align: center;
}
.avatar {
    width: 360px;
    height: 180px;
    display: block;
}
</style>