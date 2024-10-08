<script setup lang="ts">
defineOptions({
  name: "SolveQuestion"
});

import { QuestionVo } from "@/api/question/model";
import { useRoute } from "vue-router";
const route = useRoute();
let questionInfo = route.query;
console.log(questionInfo);
const obj = JSON.parse(questionInfo);
</script>

<template>
  <div class="flex h-screen">
    <div class="w-full bg-gray-200 p-4 space-y-4">
      <!-- 基本信息 -->
      <div class="bg-white p-4 shadow rounded">
        <h2 class="text-xl font-semibold mb-2">
          {{ questionInfo.questionName }}
        </h2>
        <p>创建时间：{{ questionInfo.createTime }}</p>
        <p>更新时间：{{ questionInfo.updateTime }}</p>
        <p>题目通过数：{{ questionInfo.questionAcNum }}</p>
        <p>题目提交数：{{ questionInfo.questionSubmitNum }}</p>
      </div>

      <!-- 问题描述 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">题目描述</h3>
        <v-md-editor :model-value="questionInfo.questionDesc" mode="preview" />
      </div>

      <!-- 限制条件 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">限制条件</h3>
        <p>内存限制：{{ questionInfo.questionMemLimit }} MB</p>
        <p>时间限制：{{ questionInfo.questionTimeLimit }} ms</p>
        <p>输入输出总数：{{ questionInfo.questionIoTotal }}</p>
      </div>

      <!-- 标签展示 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">标签</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in questionInfo.questionTags"
            :key="tag"
            class="bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 输入输出示例 -->
      <!-- <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">输入输出示例</h3>
        <ul class="list-disc list-inside">
          <li
            v-for="testCase in questionInfo.questionIoExample"
            :key="testCase.testCaseId"
          >
            输入: {{ testCase.inputContent }} / 输出:
            {{ testCase.inputContent }}
          </li>
        </ul>
      </div> -->
    </div>

    <div class="w-1/2 bg-gray-400 p-4">右边内容</div>
  </div>
</template>

<style lang="scss" scoped></style>
