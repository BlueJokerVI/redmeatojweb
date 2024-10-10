export enum JudgeResultEnum {
  SUCCESS = 0,
  RUNTIME_OUT = 1,
  MEMORY_OUT = 3,
  RUNTIME_ERROR = 4,
  COMPILE_ERROR = 5,
  ANSWER_ERROR = 6
}

// 对应的描述信息
export const JudgeResultDescription = {
  [JudgeResultEnum.SUCCESS]: "成功通过",
  [JudgeResultEnum.RUNTIME_OUT]: "运行超时",
  [JudgeResultEnum.MEMORY_OUT]: "内存超限",
  [JudgeResultEnum.RUNTIME_ERROR]: "运行时出错",
  [JudgeResultEnum.COMPILE_ERROR]: "编译失败",
  [JudgeResultEnum.ANSWER_ERROR]: "答案错误"
};
