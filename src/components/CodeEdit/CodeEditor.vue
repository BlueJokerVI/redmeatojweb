<template>
  <div id="code-editor" ref="codeEditorRef" class="custom-scroll" />
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
  handleChange: (v: string) => {}
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
.custom-scroll {
  scrollbar-width: thin; /* 针对 Firefox 浏览器 */
  scrollbar-color: #888 #f0f0f0;
}

/* 针对 WebKit 浏览器的滚动条样式 */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
