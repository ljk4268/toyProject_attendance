
# 시작이반 출석 WepApp  
![시작이반](https://user-images.githubusercontent.com/79354149/195223232-e543ad80-7205-4bbb-ae88-876d51cce07e.jpg)


## Description

직접 기획하고 구상하여 구현한, 모임의 `출석체크를 간편하게 하기 위해 만든 프로젝트` 입니다. 

`모임장소 등록` 및 `출석 등록` `수정` `삭제`가 가능하며, `개인별 출석현황 체크`, `관리자의 경우 모든 사용자들의 출석현황`을 한 눈에 볼 수 있습니다. 

### Tech Stack  
- Javascript(ES6)
- CSS
- React
- Redux Toolkit

### What did I do
- MUI라이브러리로 UI 구현
- FullCalendar로 달력 구현
- 카카오로그인 API 사용
- Redux 및 state로 상태관리
- axios로 서버 통신
- 개발환경에서 프록시(proxy) 구축
- PWA 적용 + workbox로 서비스워커 customize

## 테스트서버 링크(Links)
[시작이반](https://www.study-test-dev.p-e.kr/ "테스트서버로 이용해보기")



## 상세기능
### 메인페이지 기능

[ 첫 메인 ]
- 오늘 날짜로 출석등록한 사람들을 확인할 수 있습니다. 
- 자기 이름옆에 '펜' 아이콘을 클릭하면 닉네임을 수정할 수 있습니다.  

[ 우측 스마일 버튼 ]  
- 이번달 출석횟수를 확인할 수 있습니다. 
- 관리자의 경우 관리자페이지 버튼이 보이며, 일반 사용자의 경우는 관리자 버튼이 보이지 않습니다.  

![메인페이지](https://user-images.githubusercontent.com/79354149/195102132-1625ecfc-03e2-49fe-abfd-a8dd4fb58800.jpeg)

---

### 캘린더페이지 기능

- 일자별로 몇명이 출석등록을 했는지 확인할 수 있습니다.
- 날짜를 클릭하면 해당 날짜에 출석등록한 사람 확인 및 출석등록 or 출석수정을 할 수 있습니다. 

![캘린더-side](https://user-images.githubusercontent.com/79354149/195103462-dcb747e1-313d-463e-9751-a886e67269c1.jpg)

---

### 출석등록페이지 기능

![IMG_6661](https://user-images.githubusercontent.com/79354149/194974191-276e7497-eeac-4a80-94bb-fac35149de13.JPG)
![IMG_6662](https://user-images.githubusercontent.com/79354149/194974194-3d8a5349-aea4-449b-b5db-f37b75bb1fe6.JPG)

---

### 관리자페이지 기능

- 관리자가 모든 사용자들의 출석횟수를 확인할 수 있습니다.  
- 정해진 출석규정을 지키지 못한 사용자의 경우 강퇴할 수 있습니다.  

![관리자페이지](https://user-images.githubusercontent.com/79354149/195104751-dd7107fd-4156-41ef-9e46-22a103035e8b.jpeg)


---

좀 더 상세한 기능 및 코드리뷰에 대해 궁금하시다면 아래 링크로 확인 부탁드립니다!  
[시작이반 코드리뷰](https://www.notion.so/WebApp-code-review-4ec83e9778ef4fff8282c1aa970dde64)

