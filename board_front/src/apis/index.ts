export const tmp = '';

// ==== API 관련 기능을 관리하는 폴더 ==== //

// 스프링부트(백엔드)의 응답 구조
// : ResponseEntity<ResponseDto<T>> 형식으로 반환

/*
  ? ResponseDto<T> 구조
  public class ResponseDto<T> {
    private boolean result; // 성공 여부
    private String message; // 응답 메시지
    private T data; // 실제 응답 데이터
  }
*/

// ! variable: URL 상수 //
const API_DOMAIN = 'http://localhost:8080'; // 마지막에 '/' x

// ! 1. 인증 관련 요청 베이스 URL
const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

// ? 인증 관련 기능
const SIGN_UP_URL = `${AUTH_MODULE_URL}/signup`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/login`;

// ! 2. 게시글 관련 요청 베이스 URL
const BOARD_MODULE_URL = `${API_DOMAIN}/api/v1/boards`;

// ? 게시글 관련 기능

// 게시글 생성
const POST_BOARD_URL = `${BOARD_MODULE_URL}`;

// 게시글 전체 조회
// const GET_BOARD_URL = `${BOARD_MODULE_URL}`;

// '나의' 게시글 전체 조회
const GET_MY_BOARD_URL = `${BOARD_MODULE_URL}/me`;

// 게시글 단건 조회
const GET_BOARD_URL = (boardId: number | string) => `${BOARD_MODULE_URL}/${boardId}`; // 화살표 함수

// 게시글 수정
const PUT_BOARD_URL = (boardId: number | string) => `${BOARD_MODULE_URL}/${boardId}`;

// 게시글 삭제
const DELETE_BOARD_URL = (boardId: number | string) => `${BOARD_MODULE_URL}/${boardId}`;

// 댓글 생성
const POST_COMMENT_URL = (boardId: number | string) => `${BOARD_MODULE_URL}/${boardId}/comments`;

// 댓글 조회 (전체)
const GET_COMMENT_URL = (boardId: number | string) => `${BOARD_MODULE_URL}/${boardId}/comments`;

// 댓글 삭제
const DELETE_COMMENT_URL = (boardId: number | string, commentId: number) => `${BOARD_MODULE_URL}/${boardId}/comments/${commentId}`;

// & function: Authorization Bearer 헤더 //
// >> 인증이 필요한 모든 요청에 JWT access token을 붙이기 위해 사용
const bearerAuthorization = (accessToken: string) => ({
  headers: {'Authorization': `Bearer ${accessToken}`}
}); // 객체{}는 소괄호로 감싸서 전달: ({})

// ? ex) axios.get(URL, bearerAuthorization(token));
