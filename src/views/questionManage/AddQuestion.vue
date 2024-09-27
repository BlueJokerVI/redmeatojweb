<script setup lang="ts">
import { QuestionTags } from "@/api/question/enum";
import { AddQuestionReq } from "@/api/question/model";
import { addQuestion } from "@/api/question/request";
import { message } from "@/utils/message";
import { ref } from "vue";

defineOptions({
  name: "AddQuestion"
});

let questionInfo = ref<AddQuestionReq>({
  questionDesc: "",
  questionIoExample: [{ inputContent: "", outputContent: "", testCaseId: "" }],
  questionIoTotal: 0,
  questionMemLimit: 524288,
  questionName: "",
  questionTags: ["模拟"],
  questionTimeLimit: 1000
});
const tags = Object.keys(QuestionTags).map(key => ({
  value: QuestionTags[key as keyof typeof QuestionTags], // 使用枚举值
  label: QuestionTags[key as keyof typeof QuestionTags] // 使用枚举值
}));

const addTestCase = () => {
  questionInfo.value.questionIoExample.push({
    inputContent: "",
    outputContent: "",
    testCaseId: ""
  });
};

const deleteTestCase = index => {
  questionInfo.value.questionIoExample.splice(index, 1);
};

const add = async () => {
  questionInfo.value.questionIoTotal =
    questionInfo.value.questionIoExample.length;
  const res = await addQuestion(questionInfo.value);
  if (res.code === 0) {
    message("新增题目成功", { type: "success" });
  }
  console.log("res", res);
};
</script>

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
      v-for="(testCase, index) in questionInfo.questionIoExample"
      :key="testCase.testCaseId"
      class="mb-6"
    >
      <label class="w-24 text-xxl font-bold"
        >测试用例：{{ (testCase.testCaseId = index + 1 + "") }}
      </label>
      <el-button
        size="small"
        type="danger"
        class="ml-2"
        @click="deleteTestCase(index)"
        >删除</el-button
      >
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
    <el-button type="warning" class="" @click="addTestCase"
      >添加测试用例</el-button
    >
    <el-button type="primary" class="" @click="add">新增题目</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
