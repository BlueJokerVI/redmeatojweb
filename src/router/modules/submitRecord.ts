// 最简代码，也就是这些字段必须有
import { UserRole } from "@/api/user/model";
import barChartBoxFill from "@iconify-icons/ri/bar-chart-box-fill";
export default {
  path: "/submitRecords",
  meta: {
    icon: barChartBoxFill,
    title: "实时提交记录",
    roles: [UserRole[1]],
    rank: 1
  },
  children: [
    {
      path: "/submitRecords/index",
      name: "SubmitRecords",
      component: () => import("@/views/submitRecord/SubmitRecords.vue"),
      meta: {
        title: "实时提交记录",
        showLink: true,
        showParent: true
      }
    },
    {
      path: "/submitRecords/submitRecord",
      name: "SubmitRecord",
      component: () => import("@/views/questionSolve/SubmitRecord.vue"),
      meta: {
        title: "提交结果",
        showLink: false,
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
