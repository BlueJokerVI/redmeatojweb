<script setup lang="ts">
defineOptions({
  name: "SolveQuestion"
});

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEdit/CodeEditor.vue";
import { AddSubmitRecordReq } from "@/api/submitRecord/model";
import { addSubmitRecord } from "@/api/submitRecord/request";
import { message } from "@/utils/message";
import thumbUp from "@iconify-icons/ri/thumb-up-line";
import thumbUpDeep from "@iconify-icons/ri/thumb-up-fill";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getQuestionThumb, thumbQuestion } from "@/api/question/request";
import { number } from "echarts";

const route = useRoute();
let questionInfo = JSON.parse(route.query.questionInfo as any);

let codeValue = ref(
  "public class Main { \n" +
    "    public static void main(String[] args){ \n" +
    "        \n" +
    "    } \n" +
    "}"
);

const codeTemplate = [
  "public class Main { \n" +
    "    public static void main(String[] args){ \n" +
    "        \n" +
    "    } \n" +
    "}",
  "#include <iostream> \n" +
    "using namespace std; \n" +
    "\n" +
    "int main() { \n" +
    "    \n" +
    "    return 0; \n" +
    "}"
];

let judging = ref(false);

let req = ref<AddSubmitRecordReq>({
  language: "java",
  questionId: questionInfo.id,
  submitContext: codeTemplate[0]
});

const languageOptions = [
  {
    value: "java",
    label: "java"
  },
  {
    value: "cpp",
    label: "cpp"
  }
];

const changeLanguage = v => {
  if (v === "java") {
    codeValue.value = codeTemplate[0];
    req.value.language = "java";
  } else if (v === "cpp") {
    codeValue.value = codeTemplate[1];
    req.value.language = "cpp";
  }
};

//将编辑器内代码复制到请求内
const handleChange = code => {
  req.value.submitContext = code;
};

let router = useRouter();

const submitCode = async () => {
  judging.value = true;
  let res = await addSubmitRecord(req.value);
  judging.value = false;

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

//点赞相关
let clicked = ref(false);
let thumbNum = ref(0);
const thumbClick = () => {
  if (clicked.value === false) {
    thumbQuestion(questionInfo.id, 1);
    thumbNum.value += 1;
  } else {
    thumbQuestion(questionInfo.id, -1);
    thumbNum.value -= 1;
  }
  clicked.value = !clicked.value;
};

onMounted(async () => {
  let res = await getQuestionThumb(questionInfo.id);
  thumbNum.value = parseInt(res.data);
});
</script>

<template>
  <div class="flex h-screen">
    <div class="w-1/2 bg-gray-200 p-4 space-y-2 overflow-y-auto">
      <!-- 基本信息 -->
      <div class="bg-white p-4 shadow rounded">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold mb-2">
            {{ questionInfo.questionName }}
          </h2>
          <div>
            <el-button
              v-if="clicked"
              :icon="useRenderIcon(thumbUpDeep)"
              type="success"
              size="small"
              plain
              round
              @click="thumbClick"
              >{{ thumbNum }}</el-button
            >
            <el-button
              v-if="!clicked"
              :icon="useRenderIcon(thumbUpDeep)"
              size="small"
              plain
              round
              @click="thumbClick"
              >{{ thumbNum }}</el-button
            >
          </div>
        </div>
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
            <!-- 保留文本中的换行与空白符 -->
            <pre v-html="testCase.inputContent" />
          </div>
          <div class="mt-2 font-serif font-bold">输出:</div>
          <div class="mb-4 border p-2 rounded bg-gray-50">
            <pre v-html="testCase.outputContent" />
          </div>
        </div>
      </div>

      <!-- 限制条件 -->
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-semibold mb-2">限制条件</h3>
        <p>内存限制：{{ questionInfo.questionMemLimit }} KB</p>
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
        <el-select
          v-model="req.language"
          placeholder="选择语言"
          style="width: 100px"
          v-on:change="changeLanguage"
        >
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <CodeEditor
        :value="codeValue"
        :handle-change="handleChange"
        class="bg-gray-50 border rounded border-gray-200 p-4 duration-300 overflow-auto max-h-[70vh]"
        :language="req.language"
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
