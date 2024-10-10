// 最简代码，也就是这些字段必须有
import { UserRole } from "@/api/user/model";
import userSettingsFill from "@iconify-icons/ri/user-settings-fill";
export default {
  path: "/userManage",
  redirect: "/userManage/users",
  meta: {
    icon: userSettingsFill,
    title: "用户管理",
    roles: [UserRole[1]],
    rank: 3
  },
  children: [
    {
      path: "/userManage/users",
      name: "UserList",
      component: () => import("@/views/userManage/userList.vue"),
      meta: {
        title: "用户列表",
        // 通过设置showParent为true，显示父级
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
