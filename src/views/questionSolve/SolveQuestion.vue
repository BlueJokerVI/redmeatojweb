<script setup lang="ts">
defineOptions({
  name: "SolveQuestion"
});

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEdit/CodeEditor.vue";
import { AddSubmitRecordReq } from "@/api/submitRecord/model";
import { addSubmitRecord } from "@/api/submitRecord/request";
import { message } from "@/utils/message";

const route = useRoute();
let questionInfo = JSON.parse(route.query.questionInfo as any);
console.log(questionInfo);
let codeValue = ref(
  "public class Main { \n" +
    "    public static void main(String[] args){ \n" +
    "        \n" +
    "    } \n" +
    "}"
);
let judging = ref(false);

let req = ref<AddSubmitRecordReq>({
  language: "java",
  questionId: questionInfo.id,
  submitContext: ""
});

//将编辑器内代码复制到请求内
const handleChange = code => {
  req.value.submitContext = code;
};

let router = useRouter();

const submitCode = async () => {
  judging.value = true;
  console.log("req", req.value);
  let res = await addSubmitRecord(req.value);
  judging.value = false;
  console.log("res", res);
  if (res.code === 0) {
    message(res.message, { type: "success" });
    router.push({
      name: "SubmitRecord",
      query: { id: res.data.id }
    });
  } else {
    message(res.message, { type: "error" });
  }
};
</script>

<template>
  <div class="flex h-screen">
    <div class="w-1/2 bg-gray-200 p-4 space-y-2">
      <!-- 基本信息 -->
      <div class="bg-white p-4 shadow rounded">
        <h2 class="text-xl font-semibold mb-2">
          {{ questionInfo.questionName }}
        </h2>
        <p>题目通过数：{{ questionInfo.questionAcNum }}</p>
        <p>题目提交数：{{ questionInfo.questionSubmitNum }}</p>
      </div>

      <!-- 问题描述 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">题目描述</h3>
        <v-md-editor :model-value="questionInfo.questionDesc" mode="preview" />
      </div>

      <!-- 输入输出示例 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">输入输出示例</h3>
        <div
          v-for="testCase in questionInfo.questionIoExample"
          :key="testCase.testCaseId"
        >
          <div class="font-serif font-bold">输入:</div>
          <div class="mb-4 border p-2 rounded bg-gray-50">
            {{ testCase.inputContent }}
          </div>
          <div class="mt-2 font-serif font-bold">输出:</div>
          <div class="mb-4 border p-2 rounded bg-gray-50">
            {{ testCase.outputContent }}
          </div>
        </div>
      </div>

      <!-- 限制条件 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">限制条件</h3>
        <p>内存限制：{{ questionInfo.questionMemLimit }} MB</p>
        <p>时间限制：{{ questionInfo.questionTimeLimit }} ms</p>
      </div>
      <!-- 标签展示 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">标签</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in questionInfo.questionTags"
            :key="tag"
            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="w-1/2 bg-gray-200 p-4 space-y-2">
      <div class="bg-white p-5 rounded">
        <h2 class="text-2xl font-bold mb-3 text-gray-700">解题</h2>
      </div>

      <CodeEditor
        :value="codeValue"
        :handle-change="handleChange"
        class="bg-gray-50 border rounded border-gray-200 p-4 duration-300 overflow-auto max-h-[70vh]"
      />

      <div class="w-full flex justify-center">
        <el-button type="primary" :loading="judging" @click="submitCode"
          ><span v-if="!judging">提交</span>
          <span v-else>判题中...</span></el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
