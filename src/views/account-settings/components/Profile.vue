<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import type { FormInstance, FormRules } from "element-plus";
import { deviceDetection, storageLocal } from "@pureadmin/utils";
import uploadLine from "@iconify-icons/ri/upload-line";
import { useUserStore, useUserStoreHook } from "@/store/modules/user";
import { userType } from "@/store/types";
import { Gender } from "@/api/user/model";
import { fileUpload, getUpLoadImgUrl } from "@/api/img/request";
import {
  GetImgUrlReq,
  ImgStoreLocation,
  ImgUploadUrlResponse,
  UploadFileReq
} from "@/api/img/model";
import { UploadInstance } from "element-plus/lib/components/index.js";
import { ReCropperPreview } from "@/components/ReCropperPreview/index";
import { customUserInfo } from "@/api/user/request";
import { userKey } from "@/utils/auth";
import { use } from "echarts/types/src/extension.js";
import { util } from "echarts";
import { imgMinioUri } from "@/api/utils";
defineOptions({
  name: "Profile"
});

const userStore: userType = useUserStore();
let userInfos = reactive({
  /**性别 */
  gender: userStore.gender,
  /** 头像 */
  userAvatar: userStore.userAvatar,
  /** 昵称 */
  name: userStore.name,
  /** 用户简介*/
  userProfile: userStore.userProfile
});

// let userInfos: userType = userStore;

const imgSrc = ref("");
const uploadRef = ref<UploadInstance>();
const isShow = ref(false);
const cropperBlob = ref();
const cropRef = ref();
const ruleFormRef = ref<FormInstance>();
const uploadReq: UploadFileReq = reactive({
  uploadUrl: "",
  data: new Blob(),
  contextType: ""
});
const downloadUrl = ref();

const rules = reactive<FormRules<any>>({
  name: [
    { required: true, message: "昵称必填", trigger: "blur" },
    { min: 1, max: 20, message: "昵称长度请在1~20范围之内", trigger: "blur" }
  ],
  userProfile: [
    { max: 1024, message: "简介长度请在范围之内小于1024", trigger: "blur" }
  ]
});

const onChange = async uploadFile => {
  const reader = new FileReader();
  reader.onload = e => {
    imgSrc.value = e.target.result as string;
    isShow.value = true;
  };
  reader.readAsDataURL(uploadFile.raw);
  //设置上传图片存储在服务器的位置
  let fileInfo: GetImgUrlReq = {
    fileName: uploadFile.name,
    filePath: ImgStoreLocation.userAvatar
  };
  //获取上传图片地址
  let res: ImgUploadUrlResponse = await getUpLoadImgUrl(fileInfo);

  let url = new URL(res.data.downloadUrl);
  console.log("url", url, url.pathname + url.search);
  uploadReq.uploadUrl = imgMinioUri(url.pathname + url.search);

  //设置上传图片类型
  uploadReq.contextType = uploadFile.raw.type;
  downloadUrl.value = imgMinioUri(url.pathname);
};
const handleClose = () => {
  cropRef.value.hidePopover();
  uploadRef.value.clearFiles();
  isShow.value = false;
};

const onCropper = ({ blob }) => (cropperBlob.value = blob);

const handleSubmitImage = () => {
  //设置上传图片二级制数据
  uploadReq.data = cropperBlob.value;
  fileUpload(uploadReq)
    .then(res => {
      if (res.status === 200) {
        userInfos.userAvatar = downloadUrl.value;
        //更新数据库信息
        customUserInfo({
          userAvatar: userInfos.userAvatar
        });
        //更新pinia、本地信息
        storageLocal().setItem(userKey, {
          userAvatar: userInfos.userAvatar
        });
        useUserStoreHook().SET_USER_AVATAR(userInfos.userAvatar);
        message("更新头像成功", { type: "success" });
        handleClose();
      } else {
        message("更新头像失败");
      }
    })
    .catch(error => {
      message(`提交异常 ${error}`, { type: "error" });
    });
};

// 更新信息
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //更新数据库信息
      let res: any = await customUserInfo({
        ...userInfos
      });
      //更新pinia、本地信息
      storageLocal().setItem(userKey, {
        ...res.data
      });
      useUserStoreHook().UPDATE_USER_INFO(res.data);

      message("更新信息成功", { type: "success" });
    } else {
      message("表单校验未通过！", { type: "error" });
    }
  });
};
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">个人信息</h3>
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :rules="rules"
      :model="userInfos"
    >
      <el-form-item label="头像">
        <el-avatar :size="80" :src="userInfos.userAvatar" />
        <el-upload
          ref="uploadRef"
          accept="image/*"
          :action="uploadReq.uploadUrl"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChange"
        >
          <el-button plain class="ml-4">
            <IconifyIconOffline :icon="uploadLine" />
            <span class="ml-2">更新头像</span>
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userInfos.name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="Gender[userInfos.gender]"
          placeholder="please select your zone"
        >
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
          <el-option label="其他" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          v-model="userInfos.userProfile"
          placeholder="请输入简介"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          maxlength="56"
          show-word-limit
        />
      </el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">
        更新信息
      </el-button>
    </el-form>
    <el-dialog
      v-model="isShow"
      width="40%"
      title="编辑头像"
      destroy-on-close
      :closeOnClickModal="false"
      :before-close="handleClose"
      :fullscreen="deviceDetection()"
    >
      <ReCropperPreview ref="cropRef" :imgSrc="imgSrc" @cropper="onCropper" />
      <template #footer>
        <div class="dialog-footer">
          <el-button bg text @click="handleClose">取消</el-button>
          <el-button bg text type="primary" @click="handleSubmitImage">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
