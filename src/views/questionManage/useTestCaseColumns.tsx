import { ref } from "vue";

export function useColumns() {
  const dataList = ref([]);

  const columns: TableColumnList = [
    {
      label: "输入内容",
      prop: "inputContent",
      cellRenderer: ({ row }) => (
        <el-input type="textarea" v-model={row.inputContent} />
      )
    },
    {
      label: "输出内容",
      prop: "outputContent",
      cellRenderer: ({ row }) => (
        <el-input type="textarea" v-model={row.outputContent} />
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 90,
      slot: "operation"
    }
  ];

  function onAdd() {
    dataList.value.push({
      testCaseId: 21,
      inputContent: "",
      outputContent: ""
    });
  }

  function onDel(row) {
    const index = dataList.value.indexOf(row);
    if (index !== -1) dataList.value.splice(index, 1);
  }

  return {
    columns,
    dataList,
    onAdd,
    onDel
  };
}
