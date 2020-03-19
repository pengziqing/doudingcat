<template>
    <div class="releaseApp">
        <h3>升级管理</h3>
        <div>
            <br />
            <br />
            <el-button type="primary" @click="release">发布</el-button>
            <br />
            <br />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="appPackage" label="包名"></el-table-column>
                <el-table-column prop="versionCode" label="版本号"></el-table-column>
                <el-table-column prop="versionName" label="版本名"></el-table-column>
                <el-table-column prop="createTime" label="发布时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align:center; margin: 50px;">
                <el-pagination :page-size="-1" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>
        </div>
        <el-dialog title="发布" :visible.sync="dialogVisible" width="30%">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
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
import { getAppListByProjectId, getConfiguration, releaseApp, deleteapp } from '@/api/draw';
let md5 = '';
export default {
    name: 'releaseApp',
    data() {
        return {
            deleteId: '',
            dialogVisibleDelete: false,
            total: 0,
            getConfigurationList: {},
            fileList: [],
            dialogVisible: false,
            tableData: [],
            apkUrl: '',
            appPackage: '',
            versionCode: '',
            versionName: '',
            apkUrl: ''
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
                    this.getAppListByProjectId();
                }
            });
        },
        handleDelete(row) {
            this.dialogVisibleDelete = true;
            console.log(row);
            this.deleteId = row.id;
        },
        save() {
            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    type: 10,
                    apkUrl: this.apkUrl,
                    appPackage: this.appPackage,
                    versionCode: this.versionCode,
                    versionName: this.versionName,
                    md5: md5
                })
            );
            releaseApp(formData).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getAppListByProjectId();
                    this.apkUrl = '';
                    this.appPackage = '';
                    this.versionName = '';
                    this.versionCode = '';
                    md5 = '';
                }
            });
        },
        handleRemove(file, fileList) {
            this.fileList = [];
            this.apkUrl = '';
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
            console.log(this.fileList);
            if (this.fileList[0].response) {
                this.apkUrl = 'http://' + this.getConfigurationList.domain + '/' + this.fileList[0].response.key;
            }
        },
        release() {
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {
            const parser = new AppInfoParser(file);
            parser.parse().then(result => {
                console.log(result);
                this.versionCode = result.versionCode;
                this.versionName = result.versionName;
                this.appPackage = result.package;
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

            let formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    sysType: 'qdh-external-invocation',
                    fileName: '.apk'
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
        getAppListByProjectId() {
            var formData = new FormData();
            formData.append(
                'body',
                JSON.stringify({
                    types: [10]
                })
            );
            getAppListByProjectId(formData).then(res => {
                this.tableData = res.data.appList;
                this.total = res.data.total;
            });
        }
    },
    mounted() {
        this.getAppListByProjectId();
    }
};
</script>


<style >
.releaseApp .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.releaseApp .avatar {
    width: 160px;
    height: 150px;
    display: block;
}
.releaseApp .el-upload.el-upload--text {
    width: 160px;
    height: 150px;
}
.releaseApp .upload-demo .el-upload.el-upload--text {
    width: 80px;
    height: 32px;
}
</style>
