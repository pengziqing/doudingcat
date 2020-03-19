<template>
    <div class="application">
        <div style="float: left" class="block">
            <span class="demonstration">应用类型：</span>
            <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-button class="demonstration" type="primary" @click="search">查询</el-button>
        </div>
        <div style="float: right">
            <el-button type="primary" @click="handleEdit('add')">添加应用</el-button>
        </div>

        <div style="clear: both; padding-top: 18px;">
            <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="date" label="图片" ></el-table-column> -->
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.iconUrl" width="192" height="120" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="应用名称"></el-table-column>
                <!-- <el-table-column prop="status" label="状态"></el-table-column> -->
                <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.type == 21? '儿童': '休闲娱乐'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="appPackage" label="包名"></el-table-column>
                <el-table-column prop="versionCode" label="版本号"></el-table-column>
                <el-table-column prop="versionName" label="版本名"></el-table-column>
                <el-table-column prop="intro" label="简介"></el-table-column>

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
        <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="fnCancel" width="30%">
            <el-form :model="form">
                <el-form-item label="应用名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择应用类型">
                        <el-option label="儿童" :value="21"></el-option>
                        <el-option label="休闲娱乐" :value="22"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传图片" prop="iconUrl" :label-width="formLabelWidth">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                    <el-upload
                        class="avatar-uploader"
                        action="https://upload.qiniup.com"
                        :show-file-list="false"
                        :data="getConfigurationList"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload__tip" slot="tip">图片尺寸要求分辨率为：500 x 400</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="应用上传" prop="apkUrl" :label-width="formLabelWidth">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                    <el-upload
                        class="upload-demo"
                        action="https://upload.qiniup.com"
                        :data="getConfigurationList"
                        :on-change="handleChange"
                        :file-list="fileList"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="app包名" :label-width="formLabelWidth">
                    <el-input v-model="form.appPackage" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="版本号" :label-width="formLabelWidth">
                    <el-input v-model="form.versionCode" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="版本名" :label-width="formLabelWidth">
                    <el-input v-model="form.versionName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="md5" :label-width="formLabelWidth">
                    <el-input v-model="md5" autocomplete="off" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="简介" prop="intro" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.intro" :rows="4"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fnCancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
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
import { Message, MessageBox } from 'element-ui'
import { activityRule, getConfiguration, createHorizon, getAppList, deleteapp, createApp, updateApp } from '@/api/draw';
let md5 = '';
export default {
    name: 'useSituation',
    data() {
        return {
            md5: '',
            dialogVisibleDelete: false,
            id: '',
            deleteId: '',
            title: '',
            fileList: [],
            dialogFormVisible: false,
            form: {
                appPackage: '',
                versionCode: '',
                versionName: '',
                iconUrl: '',
                name: '',
                apkUrl: '',
                type: '',
                intro: '',
                md: ''
            },
            getConfigurationList: {},
            formLabelWidth: '120px',
            options: [
                {
                    value: 21,
                    label: '儿童'
                },
                {
                    value: 22,
                    label: '休闲娱乐'
                }
            ],
            value: '',
            tableData: [],
            total: 0,
            page: 1
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
        search() {
            console.log(this.form.type);
            this.getAppList(1, [this.value]);
        },
        handleDelete(index, row) {
            this.dialogVisibleDelete = true;
            console.log(row);
            this.deleteId = row.id;
        },
        fnDelete() {
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    idList: [this.deleteId]
                })
            );
            deleteapp(formData).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogVisibleDelete = false;
                    this.getAppList(1);
                }
            });
        },
        fnCancel() {
            this.dialogVisible = false;
            this.fileList = [];
            this.form.apkUrl = '';
            this.form.iconUrl = '';
            this.form.appPackage = '';
            this.form.name = '';
            this.form.versionCode = '';
            this.form.versionName = '';
            this.form.type = '';
            this.form.intro = '';
            this.dialogFormVisible = false;
        },
        handleRemove(file, fileList) {
            this.fileList = [];
            this.form.apkUrl = '';
            md5 = '';
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
            console.log(this.fileList);
            if (this.fileList[0].response) {
                this.form.apkUrl = 'http://' + this.getConfigurationList.domain + '/' + this.fileList[0].response.key;
            }
        },
        submitForm(formName) {
            // this.$refs[formName].validate(valid => {

            // })
            if (this.id) {
                let formData = new FormData();
                formData.append(
                    'body',
                    JSON.stringify({
                        apkUrl: this.form.apkUrl, //
                        iconUrl: this.form.iconUrl, //
                        appPackage: this.form.appPackage, //
                        name: this.form.name,
                        versionCode: this.form.versionCode,
                        versionName: this.form.versionName,
                        type: this.form.type,
                        intro: this.form.intro,
                        md5: md5,
                        id: this.id
                    })
                );
                updateApp(formData).then(res => {
                    if (res.data.result == '1001') {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.fileList = [];
                        this.form.apkUrl = '';
                        this.form.iconUrl = '';
                        this.form.appPackage = '';
                        this.form.name = '';
                        this.form.versionCode = '';
                        this.form.versionName = '';
                        this.form.type = '';
                        this.form.intro = '';
                        this.dialogFormVisible = false;
                        this.getAppList(1);
                        md5 = '';
                    } else {
                        Message({
                            message: res.msg,
                            type: 'error',
                            duration: 3 * 1000
                        });
                    }
                });
            } else {
                let formData = new FormData();
                formData.append(
                    'body',
                    JSON.stringify({
                        apkUrl: this.form.apkUrl, //
                        iconUrl: this.form.iconUrl, //
                        appPackage: this.form.appPackage, //
                        name: this.form.name,
                        versionCode: this.form.versionCode,
                        versionName: this.form.versionName,
                        type: this.form.type,
                        intro: this.form.intro,
                        md5: md5
                    })
                );
                createApp(formData).then(res => {
                    if (res.data.result == '1001') {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.fileList = [];
                        this.form.apkUrl = '';
                        this.form.iconUrl = '';
                        this.form.appPackage = '';
                        this.form.name = '';
                        this.form.versionCode = '';
                        this.form.versionName = '';
                        this.form.type = '';
                        this.form.intro = '';
                        this.dialogFormVisible = false;
                        md5 = '';
                        this.getAppList(1);
                    } else {
                        Message({
                            message: res.msg,
                            type: 'error',
                            duration: 3 * 1000
                        });
                    }
                });
            }
        },

        handleAvatarSuccess(res, file) {
            this.form.iconUrl = 'http://' + this.getConfigurationList.domain + '/' + res.key;
            // console.log(this.ruleForm.imageUrl);
        },
        beforeAvatarUpload(file) {
            let fileName = '';
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                fileName = '.png';
            } else if (file.type == 'application/vnd.android.package-archive') {
                fileName = '.apk';
                const parser = new AppInfoParser(file);
                parser.parse().then(result => {
                    console.log(result);
                    this.form.versionCode = result.versionCode;
                    this.form.versionName = result.versionName;
                    this.form.appPackage = result.package;
                });
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

                let chunkSize = 2097152; // Read in chunks of 2MB
                let chunks = Math.ceil(file.size / chunkSize);
                let currentChunk = 0;
                let spark = new SparkMD5.ArrayBuffer();
                let fileReader = new FileReader();

                fileReader.onload = function(e) {
                    console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                    spark.append(e.target.result); // Append array buffer
                    currentChunk++;
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        md5 = spark.end();
                    }
                };

                function loadNext() {
                    var start = currentChunk * chunkSize,
                        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                }

                loadNext();
            }
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    sysType: 'qdh-external-invocation',
                    fileName: fileName
                })
            );
            return new Promise((resolve, reject) => {
                getConfiguration(formData)
                    .then(res => {
                        if (res.code === 200) {
                            this.getConfigurationList.token = res.data.token;
                            this.getConfigurationList.key = res.data.key;
                            this.getConfigurationList.domain = res.data.domain;
                        }
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        },

        handleEdit(val, index, row) {
            this.dialogFormVisible = true;
            if (val == 'edit') {
                console.log(row);
                this.title = '编辑上传应用';
                // this.fileList.push() = row.apkUrl
                this.fileList = [{ name: row.appPackage + '.apk', url: row.apkUrl }];
                this.form.apkUrl = row.apkUrl;
                this.form.iconUrl = row.iconUrl;
                this.form.appPackage = row.appPackage;
                this.form.name = row.name;
                this.form.versionCode = row.versionCode;
                this.form.versionName = row.versionName;
                this.form.type = row.type;
                this.id = row.id;
                md5 = row.md5;
            } else {
                this.title = '新建上传应用';
                this.id = '';
            }
        },

        handleCurrentChange(val) {
            this.getAppList(val);
        },

        getAppList(page, type, start, end) {
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    pageSize: 10,
                    pageNum: page,
                    types: type
                })
            );
            getAppList(formData).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.appList;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        console.log(this.form.md);
        this.getAppList(this.page);
        // let formData = new FormData();
        // formData.append(
        //     'body',
        //     JSON.stringify({
        //         sysType: 'qdh-external-invocation',
        //     })
        // );
        // getConfiguration(formData).then(res => {
        //     this.getConfigurationList.token = res.data.token;
        //     this.getConfigurationList.key = res.data.key;
        //     this.getConfigurationList.domain = res.data.domain;
        // });
    }
};
</script>


<style >
.demonstration {
    margin-left: 20px;
}
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
    width: 160px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.application .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.application .avatar {
    width: 160px;
    height: 150px;
    display: block;
}
.application .el-upload.el-upload--text {
    width: 160px;
    height: 150px;
}
.application .upload-demo .el-upload.el-upload--text {
    width: 80px;
    height: 32px;
}
</style>