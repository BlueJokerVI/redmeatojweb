<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import { deviceDetection } from "@pureadmin/utils";
import { UserUpdatePasswordReq } from "@/api/user/model";
import { updatePassword } from "@/api/user/request";
import { updatePasswordRule } from "../updatePasswordRule";
import { FormInstance } from "element-plus";
defineOptions({
  name: "AccountManagement"
});

const list = ref([
  {
    title: "账户密码",
    illustrate: "当前密码强度：强",
    button: "修改"
  }
]);
const ruleFormRef = ref<FormInstance>();
const updatePasswordReq: UserUpdatePasswordReq = reactive({
  newPassword: "",
  newRepeatedPassword: "",
  oldPassword: ""
});
const dialogVisible = ref(false);
const toUpdatePassword = async () => {
  const res: any = await updatePassword(updatePasswordReq);
  dialogVisible.value = false;
  if (res.code === 0) {
    message("修改密码成功！", { type: "success" });
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      toUpdatePassword();
    } else {
      console.log("error submit!", fields);
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
    <h3 class="my-8">账户管理</h3>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <el-text class="mx-1" type="info">{{ item.illustrate }}</el-text>
        </div>
        <el-button type="primary" text @click="dialogVisible = true">
          {{ item.button }}
        </el-button>
      </div>
      <el-divider />
    </div>
    <el-dialog v-model="dialogVisible" title="修改密码" class="font-bold">
      <template #footer>
        <div class="dialog-footer">
          <el-form
            ref="ruleFormRef"
            :model="updatePasswordReq"
            :rules="updatePasswordRule"
            label-width="auto"
          >
            <el-form-item label="请输入密码" prop="oldPassword">
              <el-input
                v-model="updatePasswordReq.oldPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="请输入新密码" prop="newPassword">
              <el-input
                v-model="updatePasswordReq.newPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="请重复输入新密码" prop="newRepeatedPassword">
              <el-input
                v-model="updatePasswordReq.newRepeatedPassword"
                type="password"
                show-password
              />
            </el-form-item>
          </el-form>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-divider--horizontal {
  border-top: 0.1px var(--el-border-color) var(--el-border-style);
}
</style>
