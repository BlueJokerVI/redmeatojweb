<template>
  <div>
    <div
      class="w-auto text-xl bg-gray-100 px-3 py-2 rounded-md text-gray-800 font-semibold shadow-sm"
    >
      编辑题目描述内容
    </div>
    <v-md-editor v-model="questionInfo.questionDesc" height="400px" />
    <div
      class="w-auto text-xl bg-gray-100 px-3 py-2 rounded-md text-gray-800 font-semibold shadow-sm mb-5"
    >
      更新题目基本信息
    </div>
    <el-form
      label-width="auto"
      :model="questionInfo"
      class="w-auto max-w-[600px]"
      label-position="left"
    >
      <el-form-item label="题目名称">
        <el-input v-model="questionInfo.questionName" />
      </el-form-item>
      <el-form-item label="题目时间限制(单位ms)">
        <el-input v-model="questionInfo.questionTimeLimit" />
      </el-form-item>
      <el-form-item label="题目内存限制(单位kb)">
        <el-input v-model="questionInfo.questionMemLimit" />
      </el-form-item>
      <el-form-item label="题目标签">
        <el-select
          v-model="questionInfo.questionTags"
          class="!w-auto min-w-60 ml-1"
          multiple
          tag-type="primary"
          filterable
          :collapse-tags="true"
          :max-collapse-tags="4"
          default-first-option
          :reserve-keyword="false"
          placeholder="选择题目标签"
        >
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div
      class="w-auto text-xl bg-gray-100 px-3 py-2 rounded-md text-gray-800 font-semibold shadow-sm mb-5"
    >
      更新题目测试用例样例
    </div>
    <div
      v-for="testCase in questionInfo.questionIoExample"
      :key="testCase.testCaseId"
      class="mb-6"
    >
      <label class="w-24 text-xxl font-bold"
        >测试用例：{{ testCase.testCaseId }}
      </label>
      <!-- 输入内容部分 -->
      <div class="mb-4 w-auto">
        <label class="w-24 text-left text-gray-500 text-sm">输入内容 </label>
        <el-input
          v-model="testCase.inputContent"
          class="mt-2"
          type="textarea"
          :autosize="{ minRows: 2 }"
        />
      </div>

      <!-- 输出内容部分 -->
      <div class="mb-4 w-auto">
        <label class="w-24 text-left text-gray-500 text-sm">输出内容 </label>
        <el-input
          v-model="testCase.outputContent"
          class="mt-2"
          :autosize="{ minRows: 2 }"
          type="textarea"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { QuestionTags } from "@/api/question/enum";
import { QuestionVo } from "@/api/question/model";
import { ref } from "vue";
defineOptions({
  name: "UpdateQuestionFrom"
});

//从父组件获取参数
// 声明 props 类型
export interface FormProps {
  formInline: QuestionVo;
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = defineProps<FormProps>();

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const questionInfo = ref(props.formInline);

// let questionInfo = ref({ ...props });

const tags = Object.keys(QuestionTags).map(key => ({
  value: QuestionTags[key as keyof typeof QuestionTags], // 使用枚举值
  label: QuestionTags[key as keyof typeof QuestionTags] // 使用枚举值
}));
</script>
<style scoped></style>
