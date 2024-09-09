<script setup lang="ts">
defineOptions({
  name: "UpdateUserFrom"
});
import { ref } from "vue";
import { AdminUpdateUserReq } from "@/api/user/model";
// 声明 props 类型
export interface FormProps {
  formInline: AdminUpdateUserReq & {
    resetUserAvatar: boolean;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: undefined,
    gender: undefined,
    mpOpenId: undefined,
    name: undefined,
    password: undefined,
    unionId: undefined,
    userAvatar: undefined,
    userProfile: undefined,
    userRole: undefined,
    resetUserAvatar: false
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form
    :model="newFormInline"
    label-position="top"
    label-width="auto"
    class="w-[90%]"
    style="margin: 0 auto"
  >
    <el-form-item label="昵称" label-position="right">
      <el-input v-model="newFormInline.name" placeholder="请输要修改的昵称" />
    </el-form-item>
    <el-form-item label="微信ID" label-position="right">
      <el-input
        v-model="newFormInline.unionId"
        placeholder="请输要修改的微信ID"
      />
    </el-form-item>
    <el-form-item label="用户密码" label-position="right">
      <el-input
        v-model="newFormInline.password"
        placeholder="请输要修改的密码"
      />
    </el-form-item>
    <el-form-item label="是否重置头像" label-position="right">
      <el-avatar :src="newFormInline.userAvatar" class="mr-3" />
      <el-radio-group v-model="newFormInline.resetUserAvatar">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户权限" label-position="right">
      <el-select
        v-model="newFormInline.userRole"
        placeholder="请选要赋予的权限"
      >
        <el-option label="普通用户" :value="0" />
        <el-option label="管理员" :value="1" />
        <el-option label="黑名单用户" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="用户简介" label-position="right">
      <el-input
        v-model="newFormInline.userProfile"
        type="textarea"
        placeholder="用户简介"
      />
    </el-form-item>
  </el-form>
</template>
