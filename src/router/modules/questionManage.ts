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
    rank: 2
  },
  children: [
    {
      path: "/questionManage/questions",
      name: "QuestionManage",
      component: () => import("@/views/questionManage/QuestionManage.vue"),
      meta: {
        title: "题目列表",
        // 通过设置showParent为true，显示父级
        showParent: true
      }
    },
    {
      path: "/questionManage/addQuestion",
      name: "AddQuestion",
      component: () => import("@/views/questionManage/AddQuestion.vue"),
      meta: {
        title: "新增题目",
        showParent: true
      }
    },
    {
      path: "/solveQuestion",
      name: "SolveQuestion",
      component: () => import("@/views/questionSolve/SolveQuestion.vue"),
      meta: {
        title: "解题",
        showLink: false,
        rank: 103
      }
    }
  ]
} as RouteConfigsTable;
