<template>
  <div class="rounded mb-2">
    <span class="text-sm font-semibold text-gray-800">
      测试用例编号：{{ testCase.testCaseId }}
    </span>
  </div>
  <el-form
    label-position="left"
    label-width="auto"
    :model="testCase"
    style="max-width: 600px"
  >
    <el-form-item label="输入内容" text :value="testCase.inputContent">
      <el-input v-model="testCase.inputContent" />
    </el-form-item>
    <el-form-item label="输出内容" text :value="testCase.outputContent">
      <el-input v-model="testCase.outputContent" />
    </el-form-item>
  </el-form>
</template>
<script setup lang="tsx">
import { BasePageResponse } from "@/api/model";
import { QuestionTags } from "@/api/question/enum";
import {
  GetTestCasePageReq,
  GetTestCasePageResp,
  QuestionVo,
  TestCase
} from "@/api/question/model";
import { getQuestionTestCasePage } from "@/api/question/request";
import { message } from "@/utils/message";
import { onMounted, ref } from "vue";
defineOptions({
  name: "UpdateQuestionTestCaseFrom"
});

//从父组件获取参数
// 声明 props 类型
export interface FormProps {
  formInline: TestCase;
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = defineProps<FormProps>();

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const testCase = ref(props.formInline);
</script>
<style scoped></style>
