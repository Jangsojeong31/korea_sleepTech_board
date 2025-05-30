import { ResponseDto } from "@/dtos/response";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { DELETE_BOARD_URL, GET_BOARD_URL, GET_MY_BOARD_URL, POST_BOARD_URL, PUT_BOARD_URL } from "../constants";
import { PostBoardRequestDto } from "@/dtos/request/board/post-board.request.dto";
import { BoardResponseDto } from "@/dtos/response/board/board.response.dto";
import { UpdateBoardRequestDto } from "@/dtos/request/board/update-board.request.dto";

// 생성(CREATE)
export const postBoard = async (dto: PostBoardRequestDto, accessToken: string): Promise<ResponseDto<BoardResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_BOARD_URL, dto, bearerAuthorization(accessToken))
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);  // error도 ResponseDTo 형태로 반환
  }
}

// 조회(READ)
// 내 게시글 조회: 매개변수로 토큰만 보내도 원하는 응답 받기 가능
export const getMyBoard = async (accessToken: string): Promise<ResponseDto<BoardResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_MY_BOARD_URL, bearerAuthorization(accessToken)); // get은 RequestBody를 매개변수로 못 받음
    return responseSuccessHandler(response);
  }catch (error) {
  return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 단건 조회
export const getBoard = async (boardId: number): Promise<ResponseDto<BoardResponseDto>> => {
  try{
    const response = await axiosInstance.get(GET_BOARD_URL(boardId));
    // GET_BOARD_URL: 바뀌는 경로(id값에 따라) -> 함수로 URL 정의함
    return responseSuccessHandler(response);
  }catch (error) {
  return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 수정
export const updateBoard = async (boardId: number, dto: UpdateBoardRequestDto, accessToken: string): Promise<ResponseDto<BoardResponseDto>> => {
  try{
    const response = await axiosInstance.put(PUT_BOARD_URL(boardId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch (error) {
  return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 삭제
export const deleteBoard = async (boardId: number, accessToken: string): Promise<ResponseDto<BoardResponseDto>> => { // ResponseDto의 data 값을 null로
  try{
    const response = await axiosInstance.delete(DELETE_BOARD_URL(boardId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch (error) {
  return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}