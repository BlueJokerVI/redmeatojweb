<template>
  <div id="code-editor" ref="codeEditorRef" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

//自定义主题
monaco.editor.defineTheme("myCustomTheme", {
  base: "vs", // 基于哪个内置主题，可以是 'vs', 'vs-dark', 'hc-black'
  inherit: true, // 是否继承基本主题
  rules: [],
  colors: {
    "editor.background": "#e5e7eb",
    "editor.foreground": "#1f1f1f",
    "editor.lineHighlightBackground": "#e5e7eb"
  }
});
monaco.editor.setTheme("myCustomTheme"); // 应用自定义主题

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  }
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      const model = toRaw(codeEditor.value).getModel();
      model.setValue(props.value);
      monaco.editor.setModelLanguage(model, props.language);
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false
    },
    readOnly: false,
    theme: "myCustomTheme",
    lineNumbers: "on"
    // roundedSelection: false,
    // scrollBeyondLastLine: false
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped>
#code-editor {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>
