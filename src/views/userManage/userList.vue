<script setup lang="tsx">
import { UserListReq, UserListResp } from "@/api/user/model";
import { getUserList, updateUserInfoByAdmin } from "@/api/user/request";
import { addDialog } from "@/components/ReDialog";
import { PaginationProps } from "@pureadmin/table";
import { onMounted, reactive, ref, watch } from "vue";
import UpdateUserFrom, { FormProps } from "./updateUserFrom.vue";
import { message } from "@/utils/message";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "UserList"
});

const req: UserListReq = {
  current: 1,
  pageSize: 2
};

let loadingFlag = ref(true);

let userListResp = ref<UserListResp | null>(null);

let userListData = ref([]);

onMounted(async () => {
  userListResp.value = await getUserList(req);
  pagination.pageSize = userListResp.value.data.pageSize;
  pagination.currentPage = userListResp.value.data.current;
  pagination.total = userListResp.value.data.total;
  console.log("xxx", userListResp.value);
  loadingFlag.value = false;
});

const userListColumn: TableColumnList = [
  {
    label: "id",
    prop: "id"
  },
  {
    label: "账号",
    prop: "account"
  },
  {
    label: "昵称",
    prop: "name"
  },
  {
    label: "性别",
    prop: "gender",
    cellRenderer: ({ row }) => (
      <div>
        {row.gender === 0 && <el-tag type="primary">男</el-tag>}
        {row.gender === 1 && <el-tag type="danger">女</el-tag>}
        {row.gender === 2 && <el-tag type="success">其他</el-tag>}
      </div>
    )
  },
  {
    label: "头像",
    prop: "userAvatar",
    cellRenderer: ({ row }) => (
      <>
        {row.userAvatar === null || "" ? (
          <el-avatar src={"/src/assets/user.jpg"} />
        ) : (
          <el-avatar src={row.userAvatar} />
        )}
      </>
    )
  },
  {
    label: "简介",
    prop: "userProfile"
  },
  {
    label: "权限",
    prop: "userRole",
    cellRenderer: ({ row }) => (
      <>
        {row.userRole === 0 && <el-tag type="success">普通用户</el-tag>}
        {row.userRole === 1 && <el-tag type="primary">管理员</el-tag>}
        {row.userRole === 2 && <el-tag type="danger">拉黑用户</el-tag>}
      </>
    )
  },
  {
    label: "编辑",
    cellRenderer: ({ row }) => (
      <>
        <el-button
          size="small"
          effect="dark"
          type="primary"
          onClick={() => {
            updateUserInfo(row);
          }}
        >
          编辑
        </el-button>
      </>
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

//每页大小发生改变是重新获取页信息
async function onSizeChange(val) {
  req.pageSize = val;
  userListResp.value = await getUserList(req);
}
//去不同页时获取页信息
async function onCurrentChange(val) {
  req.current = val;
  userListResp.value = await getUserList(req);
}

watch(
  userListResp,
  () => {
    userListData.value = userListResp.value.data.lists;
  },
  { deep: true }
);

function updateUserInfo(row) {
  addDialog({
    width: "50%",
    title: "修改用户信息",
    contentRenderer: () => UpdateUserFrom,
    props: {
      // 赋默认值
      formInline: {
        id: row.id,
        gender: row.gender,
        mpOpenId: row.mpOpenId,
        name: row.name,
        unionId: row.unionId,
        userAvatar: row.userAvatar,
        userProfile: row.userProfile,
        userRole: row.userRole,
        password: undefined,
        resetUserAvatar: false
      }
    },
    closeCallBack: async ({ options, args }) => {
      // options.props 是响应式的
      const { formInline } = options.props as FormProps;
      if (args?.command === "sure") {
        //重置头像
        if (formInline.resetUserAvatar === true) {
          formInline.userAvatar = "";
        }
        let res: any = await updateUserInfoByAdmin(formInline);
        if (res.code === 0) {
          message("修改成功", { type: "success" });
        }
      }
    }
  });
}
</script>

<template>
  <div>
    <pure-table
      class="mr-1"
      border
      size="default"
      alignWhole="center"
      :data="userListData"
      :columns="userListColumn"
      :loading="loadingFlag"
      :pagination="pagination"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    />
  </div>
</template>

<style scoped></style>
