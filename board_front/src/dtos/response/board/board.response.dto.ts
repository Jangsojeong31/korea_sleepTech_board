export interface BoardResponseDto {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string; 
  updatedAt?: string; // updatedAt은 없을수도 있기 때문에 옵셔널 처리

  // # JS는 일반적으로 날짜(DATE)를 string 형태로 응답받는 것이 표준
  // JSON 표준 내에 날짜 타입이 없음(날짜형식을 인식 못함): string 으로 전달받은 날짜를 new Date()를 사용하여 반환
  // 서버(백엔드) > 프론트엔드 전달: 문자열
}