export interface UpdateBoardRequestDto {
  title?: string;
  content?: string;
  // title이나 content 둘 중 하나만 수정하는 경우를 위해 ?(옵셔널) 처리
}