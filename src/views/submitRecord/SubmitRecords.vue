<script setup lang="tsx">
import {
  JudgeResultDescription,
  JudgeResultEnum
} from "@/api/submitRecord/enums";
import {
  SearchSubmitRecordsReq,
  SearchSubmitRecordsResp
} from "@/api/submitRecord/model";
import { searchSubmitRecords } from "@/api/submitRecord/request";
import { PaginationProps } from "@pureadmin/table";
import { onMounted, reactive, ref } from "vue";

defineOptions({
  name: "SubmitRecords"
});
let submitRecordColumn: TableColumnList = [
  {
    label: "id",
    prop: "id",
    cellRenderer: ({ row }) => (
      <router-link to={{ path: "SubmitRecord", query: { id: row.id } }}>
        <el-link type="primary">{row.id}</el-link>
      </router-link>
    )
  },
  {
    label: "用户ID",
    prop: "userId"
  },
  {
    label: "题目编号ID",
    prop: "questionId"
  },
  {
    label: "语言",
    prop: "language",
    cellRenderer: ({ row }) => (
      <>
        <el-tag type="primary">{row.language}</el-tag>
      </>
    )
  },
  {
    label: "判题结果",
    prop: "judgeResult",
    cellRenderer: ({ row }) => (
      <>
        {row.judgeResult === JudgeResultEnum.SUCCESS && (
          <el-tag type="success">
            {JudgeResultDescription[row.judgeResult]}
          </el-tag>
        )}
        {row.judgeResult !== JudgeResultEnum.SUCCESS && (
          <el-tag type="danger">
            {JudgeResultDescription[row.judgeResult]}
          </el-tag>
        )}
      </>
    )
  },
  {
    label: "运行时间(ms)",
    prop: "timeConsume"
  },
  {
    label: "运行消耗内存(kb)",
    prop: "memoryConsume"
  },
  {
    label: "提交时间",
    prop: "createTime"
  }
];

let req: SearchSubmitRecordsReq = {
  current: 1,
  pageSize: 10,
  sortField: "create_time",
  sortOrder: "descend"
};
let submitRecords = ref();
let loadingFlag = ref(true);
let pagination = reactive<PaginationProps | null>({
  pageSize: 1,
  currentPage: 1,
  pageSizes: [10, 15, 20],
  total: 10,
  align: "right",
  background: true,
  size: "default"
});

let submitRecordResp = ref<SearchSubmitRecordsResp | null>(null);

onMounted(async () => {
  submitRecordResp.value = await searchSubmitRecords(req);
  submitRecords.value = submitRecordResp.value.data.lists;
  pagination.total = submitRecordResp.value.data.total;
  loadingFlag.value = false;
});

//每页大小发生改变是重新获取页信息
async function onSizeChange(val) {
  req.pageSize = val;
  submitRecordResp.value = await searchSubmitRecords(req);
  submitRecords.value = submitRecordResp.value.data.lists;
}
//去不同页时获取页信息
async function onCurrentChange(val) {
  req.current = val;
  submitRecordResp.value = await searchSubmitRecords(req);
  submitRecords.value = submitRecordResp.value.data.lists;
}
</script>

<template>
  <div>
    <pure-table
      class="mr-1"
      border
      size="default"
      alignWhole="center"
      :data="submitRecords"
      :columns="submitRecordColumn"
      :loading="loadingFlag"
      :pagination="pagination"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
