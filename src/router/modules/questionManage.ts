// 最简代码，也就是这些字段必须有
import { UserRole } from "@/api/user/model";
import questionSettingsFill from "@iconify-icons/ri/equalizer-fill";
export default {
  path: "/questionManage",
  redirect: "/questionManage/questions",
  meta: {
    icon: questionSettingsFill,
    title: "题目管理",
    roles: [UserRole[1]],
    rank: 1
  },
  children: [
    {
      path: "/userManage/questions",
      name: "QuestionManage",
      component: () => import("@/views/questionManage/QuestionManage.vue"),
      meta: {
        title: "题目列表",
        // 通过设置showParent为true，显示父级
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
