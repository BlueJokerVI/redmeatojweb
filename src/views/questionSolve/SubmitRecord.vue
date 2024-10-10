<template>
  <div class="p-4 bg-blue-50 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl flex">
      <div class="w-2/5 pr-4 border-r border-blue-200">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-900">
          提交结果
        </h2>
        <div class="space-y-4 text-blue-900">
          <div class="flex justify-between">
            <span class="font-semibold">ID:</span>
            <span>{{ submitInfo.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Question ID:</span>
            <span>{{ submitInfo.questionId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">User ID:</span>
            <span>{{ submitInfo.userId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Language:</span>
            <span>{{ submitInfo.language }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Judge Result:</span>
            <el-tag
              v-if="(submitInfo.judgeResult as any) === 0"
              type="success"
              >{{
                JudgeResultDescription[submitInfo.judgeResult as any]
              }}</el-tag
            >
            <el-tag v-else type="danger">{{
              JudgeResultDescription[submitInfo.judgeResult as any]
            }}</el-tag>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Time Consume (ms):</span>
            <span>{{ submitInfo.timeConsume ?? "N/A" }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Memory Consume (KB):</span>
            <span>{{ submitInfo.memoryConsume ?? "N/A" }}</span>
          </div>
        </div>
      </div>

      <div class="w-2/3 pl-4">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-900">代码</h2>
        <div class="bg-blue-50 p-4 rounded-lg shadow-inner overflow-auto">
          <pre class="text-blue-900 whitespace-pre-wrap">{{
            submitInfo.submitContext
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup name="SubmitRecord">
import {
  JudgeResultDescription,
  JudgeResultEnum
} from "@/api/submitRecord/enums";
import {
  SearchSubmitRecordsReq,
  SubmitRecordVo
} from "@/api/submitRecord/model";
import { searchSubmitRecords } from "@/api/submitRecord/request";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
defineOptions({
  name: "SubmitRecord"
});

let route = useRoute();
let submitInfo = ref<SubmitRecordVo>({
  createTime: "",
  id: "string",
  judgeResult: 0,
  language: "",
  memoryConsume: 0,
  questionId: "string",
  submitContext: "string",
  timeConsume: 0,
  userId: "string"
});
let submitRecordId = route.query.id;
console.log(submitRecordId);
onMounted(async () => {
  let req: SearchSubmitRecordsReq = {
    current: 1,
    pageSize: 1,
    id: submitRecordId as any
  };
  let res = await searchSubmitRecords(req);
  console.log("searchSubmitRecords", res);
  submitInfo.value = res.data.lists[0];
});
</script>

<style scoped>
/* 这里可以根据需要进一步调整样式 */
</style>
