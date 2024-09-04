// 最简代码，也就是这些字段必须有
export default {
  path: "/fighting",
  redirect: "/fighting/index",
  meta: {
    title: "一级菜单"
  },
  children: [
    {
      path: "/fighting/index",
      name: "Fighting",
      component: () => import("@/views/fighting/index.vue"),
      meta: {
        title: "二级菜单",
        // 通过设置showParent为true，显示父级
        showParent: true
      }
    },
    {
      path: "/fighting/index1",
      name: "Fighting1",
      component: () => import("@/views/permission/page/index.vue"),
      meta: {
        title: "二级菜单1"
      }
    }
  ]
} as RouteConfigsTable;
