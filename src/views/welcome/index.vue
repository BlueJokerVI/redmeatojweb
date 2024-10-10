<template>
  <div>
    <div class="mb-2 flex">
      <el-input
        v-model="questionPageReq.id"
        class="!w-60 ml-1"
        placeholder="题目编号ID"
        :prefix-icon="useRenderIcon(searchIcon)"
      />
      <el-input
        v-model="questionPageReq.questionName"
        class="!w-60 ml-1"
        placeholder="题目名称"
        :prefix-icon="useRenderIcon(searchIcon)"
      />
      <el-select
        v-model="questionPageReq.questionTags"
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
      <el-button
        :icon="useRenderIcon(searchIcon)"
        type="primary"
        class="ml-2"
        @click="getQuestions(questionPageReq)"
        >搜索</el-button
      >
    </div>
    <pure-table
      class="mr-1"
      border
      size="default"
      alignWhole="center"
      :data="questionPage"
      :columns="questionListColumn"
      :loading="loadingFlag"
      :pagination="pagination"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    />
  </div>
</template>

<script setup lang="tsx">
defineOptions({
  name: "Welcome"
});
import {
  QuestionVo,
  SearchQuestionListReq,
  SearchQuestionListResp,
  UpdateQuestionReq
} from "@/api/question/model";
import {
  deleteQuestion,
  searchQuestions,
  updateQuestion
} from "@/api/question/request";
import { PaginationProps } from "@pureadmin/table";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { onMounted, reactive, ref, watchEffect } from "vue";
import searchIcon from "@iconify-icons/ep/search";
import { QuestionTags } from "@/api/question/enum";
import { addDialog } from "@/components/ReDialog";
import { message } from "@/utils/message";
import { updateUserInfoByAdmin } from "@/api/user/request";
import { addDrawer } from "@/components/ReDrawer";
import UpdateQuestionFrom from "./UpdateQuestionFrom.vue";
import { useRoute, useRouter } from "vue-router";
const getQuestions = async (data: SearchQuestionListReq) => {
  const res = await searchQuestions(data);
  questionPage.value = res.data.lists;
  pagination.total = res.data.total;
  pagination.currentPage = res.data.current;
};

let loadingFlag = ref(true);

let questionPage = ref();
const questionListColumn: TableColumnList = [
  {
    label: "id",
    prop: "id",
    showOverflowTooltip: true
  },
  {
    label: "题目名称",
    prop: "questionName"
  },
  {
    label: "题目描述",
    prop: "questionDesc",
    showOverflowTooltip: true
  },
  {
    label: "题目标签",
    prop: "questionTags",
    cellRenderer: ({ row }) => (
      <>
        {row.questionTags.map((tag, index) => (
          <el-tag class="ml-1" key={index} type="success">
            {tag}
          </el-tag>
        ))}
      </>
    )
  },
  {
    label: "通过/提交",
    prop: "questionAcNum",
    cellRenderer: ({ row }) => (
      <>
        <el-tag class="ml-1" type="info">
          {row.questionAcNum} / {row.questionSubmitNum}
        </el-tag>
      </>
    )
  },
  {
    label: "解题",
    width: "150px",
    cellRenderer: ({ row }) => (
      <div>
        <el-button type="primary" plain onClick={() => goSolve(row)}>
          尝试
        </el-button>
      </div>
    )
  }
];
let pagination = reactive<PaginationProps | null>({
  pageSize: 1,
  currentPage: 1,
  pageSizes: [10, 15, 20],
  total: 10,
  align: "right",
  background: true,
  size: "default"
});

const questionPageReq: SearchQuestionListReq = reactive({
  pageSize: 10,
  current: 1
});

//题目标签处理
const tags = Object.keys(QuestionTags).map(key => ({
  value: QuestionTags[key as keyof typeof QuestionTags], // 使用枚举值
  label: QuestionTags[key as keyof typeof QuestionTags] // 使用枚举值
}));
watchEffect(() => {
  console.log("questionPageReq", questionPageReq.questionTags);
});

//每页大小发生改变是重新获取页信息
async function onSizeChange(val) {
  questionPageReq.pageSize = val;
  await getQuestions(questionPageReq);
}
//去不同页时获取页信息
async function onCurrentChange(val) {
  questionPageReq.current = val;
  await getQuestions(questionPageReq);
}

//去题解页面
let router = useRouter();
const goSolve = questionInfo => {
  router.push({
    name: "SolveQuestion",
    query: { questionInfo: JSON.stringify(questionInfo) }
  });
};

onMounted(async () => {
  await getQuestions({ pageSize: 10, current: 1 });
  loadingFlag.value = false;
});
</script>

<style scoped></style>
