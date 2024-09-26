import { http } from "@/utils/http";
import type {
  AddQuestionReq,
  AddQuestionResp,
  DeleteTestCaseReq,
  GetTestCasePageReq,
  GetTestCasePageResp,
  SearchQuestionListReq,
  SearchQuestionListResp,
  UpdateQuestionReq,
  UpdateQuestionResp
} from "./model";
import { baseUrlApi } from "../utils";
import type { BaseResponse } from "../model";

/** 添加题目请求  */
export const addQuestion = (data: AddQuestionReq) => {
  return http.request<AddQuestionResp>("post", baseUrlApi("question/add"), {
    data
  });
};

/**删除题目请求 */
export const deleteQuestion = (data: string) => {
  return http.request<BaseResponse<null>>(
    "get",
    baseUrlApi("question/delete?questionId=" + data)
  );
};

/** 更新题目请求  */
export const updateQuestion = (data: UpdateQuestionReq) => {
  return http.request<UpdateQuestionResp>(
    "post",
    baseUrlApi("question/update"),
    {
      data
    }
  );
};

/**题目分页查询 */
export const searchQuestions = (data: SearchQuestionListReq) => {
  return http.request<SearchQuestionListResp>(
    "post",
    baseUrlApi("question/searchPage"),
    {
      data
    }
  );
};

/** 题目测试用例删除 */
export const deleteQuestionTestCase = (data: DeleteTestCaseReq) => {
  return http.request<BaseResponse<null>>(
    "post",
    baseUrlApi("question/deleteTestCase"),
    { data }
  );
};

/**
 * 题目测试用例分页搜索
 */
export const getQuestionTestCasePage = (data: GetTestCasePageReq) => {
  return http.request<GetTestCasePageResp>(
    "post",
    baseUrlApi("question/getTestCasePage"),
    { data }
  );
};
