# **하루 결산 기록 사이트, 23:59✍️**
<img src="/uploads/c8c054f7778567173ecbb2ac05b103d6/메인.png" width="1000" height="500"/>

## 1. 서비스 소개

### 🛠️ 기술 스택
<img src="/uploads/9c3d48234c84e12c043c8583f2740e88/image.png" width="1000" height="500"/>

### 👀 웹서비스 개요

```
'매일 쓰는 일기, 쓰고 싶은 부분만 골라서 기록할 순 없을까?' 라는 질문에서 시작했어요.
오늘 하루의 Todo list, 일기, 감정, 가계부, 오늘의 질문 등을 쓰고 싶은 것만 골라서 기록하고,
달력의 해당 날짜를 눌러 작성한 내용을 확인할 수 있어요.
내가 기록한 한 달의 감정 및 가계부 통계를 확인하고, 오늘의 질문을 모아볼 수 있어요.
```

## 2. 서비스 주요 기능 설명

### ✨ 페이지별 기능 소개
<details>
  <summary><h4>회원가입,로그인 페이지</h4></summary>
<img src="/uploads/e2baf7ed12ee114309ef8055fa7a6af5/회원가입_로그인.gif" width="1000" height="550"/><br/>
  <b>1. 회원가입</b><br/>
  •  이메일 형식 여부 즉시 확인<br/>
  •  비밀번호 확인<br/>
  •  이메일 중복 확인<br/>
    -  완료, 에러메시지 모달 처리<br/><br/>
  <b>2. 로그인</b><br/>
  • 이메일, 비밀번호 유효성 확인<br/>
   -  완료, 에러메시지 모달 처리<br/>
</details>
<details>
  <summary><h4>홈 페이지</h4></summary>
  <img src="/uploads/3cb34e50266a53b2577420a225e58a58/홈페이지.gif" width="1000" height="550"/><br/>
  <b>1. 기본 옵션 설정 모달</b><br/>
  • 최초 로그인 시 모달창을 띄워 기본 옵션 저장<br/><br/>    
  <b>2. 달력에서 다이어리 요약본 확인</b><br/>
  • 오늘/이전/다음 버튼 오늘 날짜로 이동, 월 이동<br/> 
  • 작성된 기록 요약 보기<br/> 
  - 감정에 따른 이모지<br/> 
  - 가계부 수입/지출 1일 합계<br/> 
  - 그 외의 기록 유무 오른쪽 점으로 표시 <br/>   
</details>
<details>
  <summary><h4>작성 페이지</h4></summary>
  <img src="/uploads/cb57b700ce11eae2d592255b96256b50/작성페이지.gif" width="1000" height="550"/><br/>
  <b>1. 작성 / 조회</b><br/> 
• 기본 설정 옵션에 따라 페이지가 다르게 조회<br/>
• 리모콘 기능으로 해당 위치로 화면 이동 가능<br/>
- To Do List : To Do 추가 및 삭제, 완료 표시<br/>
- 오늘의 질문 : 랜덤으로 질문 출력 <br/>
- 일기 : 일기 제목 및 내용 작성<br/>
- 오늘의 감정 : 감정 5개 중 선택<br/>
- 가계부 : 수입/지출, 카테고리별 금액 입력<br/>
• 작성 후 조회 페이지/홈페이지 가기 선택 가능<br/><br/>
<b>2. 수정 / 삭제</b><br/>
• 작성 내용 수정 및 삭제<br/>
- 수정 시 옵션 추가 또는 삭제 가능<br/>   
</details>
<details>
  <summary><h4>마이페이지</h4></summary>
    <img src="/uploads/d22baa622428de032fb9524284ef5e95/마이페이지1.gif" width="1000" height="550"/><br/>
    <img src="/uploads/b1cc40a290c000430aaf9c69fb08b2c1/마이페이지2.gif" width="1000" height="550"/><br/>
  <b>1. 회원 정보 수정/탈퇴</b><br/> 
  • 닉네임 수정<br/> 
  - 현재 비밀번호 확인 및 새 비밀번호 저장<br/> 
  • 탈퇴 시 사용자 정보 삭제<br/><br/> 
  <b>2. 작성페이지 옵션 설정</b><br/>
  • 작성페이지에서 고정적으로 적용할 옵션 설정<br/>
  - 옵션 선택 시 즉시 반영<br/><br/>
  <b>3. 통계보기</b><br/>
  • 감정 통계 <br/>
  - 월간 감정 개수 차트 조회<br/>
  • 가계부 통계<br/>
  - 월간 가계부(수익/지출) 카테고리별 차트 조회<br/><br/>   
  <b>4. 태그별 오늘의 질문 모아보기</b><br/>
  • 작성자의 모든 질문 조회<br/> 
  - 질문별 날짜, 답변을 모달로 조회<br/> 
  • 선택된 태그에 맞춰 질문 필터링<br/> 
  - 태그 전체 선택/해제 토글 버튼 구현<br/>  
  - 페이지네이션<br/>  
</details>

### 💡프로젝트만의 차별점, 기대 효과

    1. 그날 작성하고 싶은 옵션만 체크해서 작성/수정할 수 있다.
    2. 기본 체크 옵션을 지정/변경할 수 있다.
    3. 달력에서 월별 기록을 확인할 수 있다.
    4. 월별로 통계를 확인할 수 있다.
    5. 작성한 오늘의 질문을 태그별로 확인할 수 있다.

## 3. 서비스 구성도

### 🗺️서비스 구조도
<img src="/uploads/3dd2286865aa5a40fd1fa260ef030428/서비스_구조도.png" width="1000" height="550"/>

### 🎨와이어프레임

👉[피그마 보기](https://www.figma.com/file/weAyFeVUqDEUxBhpiWEe8W/23%3A59?node-id=0%3A1&t=0lGAFZpWEHLHBfqr-1)

### 📋API 명세

👉[API 명세 보기](https://surgedev.notion.site/DB-API-3c9c7cdb822f4dd080dcdb45fb8e3de2)

### 🪢인프라 구조

👉[인프라 구조 보기](https://media.discordapp.net/attachments/1050706291208757269/1057661481912639599/1beb610a808d2a8c.png?width=949&height=671)

## 4. 프로젝트 팀원 역할 분담

### 👥프로젝트 팀원

- [박우찬](https://github.com/Croossh)
- [김혜민](https://github.com/pansgraphy)
- [정지헌](https://github.com/honey989)
- [정호진](https://github.com/hozzijeong)
- [홍화낙](https://github.com/Nakhong)
- [설지윤](https://github.com/yoonbly)

### 🏋️멤버별 responsibility

<details>
  <summary>박우찬: 팀장/프론트엔드 담당</summary>
  <ul>
 <li>기획 단계: 구체적인 설계, 와이어프레임 작성 및 팀원간 의견 조율</li>
<li>개발 단계: 와이어프레임 기반으로 마이페이지 구현 담당</li>   
 <li>수정 단계: 스크럼 및 회의 진행, 팀 구체적인 목표 설계, 발표 진행</li> 
</ul>   
</details>
<details>
  <summary>김혜민: 백엔드 담당</summary>
  <ul>
 <li>기획 단계: 기술스택 선정, 서버구조 기획, 전체적인 api 설계, DB 선택 및 구조화</li>
<li>개발 단계:  사용자 스키마 및 api 구현, docker를 이용한 ec2 배포 구현</li>   
 <li>수정 단계: 피드백 반영해서 백엔드 설계 수정, 에러 핸들러 구현</li> 
</ul>   
</details>
<details>
<summary>정지헌: 백엔드 담당</summary>
  <ul>
 <li>기획 단계: 기술스택 선정, 서버구조 기획, 전체적인 api 설계, DB 선택 및 구조화</li>
<li>개발 단계:  DB 생성 및 연결, 컨텐츠, 질문 스키마 및 api 구현</li>   
 <li>수정 단계:  피드백 반영해서 백엔드 설계 수정, DB 데이터 관리</li> 
</ul>   
</details>
<details>
<summary>정호진: 프론트엔드 담당</summary>
  <ul>
  <li>기획 단계: 아이디어 도출 및 FE work flow 및 와이어프레임 작성</li>
  <li>개발 단계: work flow 및 와이어 프레임 기준으로 작성 페이지 CRUD 구현</li>   
  <li>수정 단계: 피드백 및 오류 수정해서 작성 페이지 수정</li> 
</ul>   
</details>
<details>
<summary>홍화낙: 프론트엔드 담당</summary>
  <ul>
 <li>기획 단계:와이어프레임 작성,아이디어 공유</li>
<li>개발 단계: 와이어프레임을 기반으로 홈페이지 로그인,회원가입,회원정보수정 페이지 담당</li>   
 <li>수정 단계: 피드백 반영 및 UI개선</li> 
</ul>   
</details>
<details>
<summary>설지윤: 프론트엔드 담당</summary>
  <ul>
 <li>기획 단계: 와이어프레임 작성</li>
<li>개발 단계:  와이어프레임을 기반으로 캘린더, 모달, 홈페이지 담당</li>   
 <li>수정 단계: 피드백 반영하여 UI개선</li> 
</ul>   
</details>

## 5. 실행 방법

- 백엔드:
  ```bash
  1. 디렉토리 이동 2359_back
  2. npm install
  3. npm start
  ```
- 프론트엔드:
  ```bash
  1. 디렉토리 이동 2359_front
  2. npm start
  ```

## 6. 버전

- 2359 version 1.0.0

## 7. FAQ

1. 이 서비스는 어떻게 실행하면 되나요?

```
  1. git clone
  2. npm install
```
