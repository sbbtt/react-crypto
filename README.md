# 암호화폐 시세 조회

### 배포 URL : https://crypto-currency-rho.vercel.app/

코인시세 오픈 API를 사용해 암호화폐의 시세정보를 제공합니다.

## 1. Preview

---
### 메인 화면
<img width="664" alt="image" src="https://user-images.githubusercontent.com/54101187/209608756-c5512f63-09ad-4f0f-b248-ebeea3544233.png">
<br/>

### 다크모드 라이트모드 적용
<img width="488" alt="image" src="https://user-images.githubusercontent.com/54101187/209608881-aa0aabcb-ffdf-4b7c-bea0-1346a2b578ca.png">

- 전역상태 관리 라이브러리 Recoil을 사용하여 다크모드, 라이트모드 상태을 만들었습니다.
- 다크모드, 라이트모드의 색상은 theme.ts, styled.d.ts 파일로 관리했습니다.

### 코인 시세 차트

- ApexChart 라이브러리를 사용하여 차트 데이터를 구현했습니다.
- Chart 내 옵션 프로퍼티를 사용하여 다크모드와 라이트모드로 변경되게 구현했습니다.
- 데이터가 업데이트 반영을 위해 가격 데이터는 refetchInterval 5000ms로 데이터를 받아오게 했습니다.

<img width="491" alt="image" src="https://user-images.githubusercontent.com/54101187/209608855-e8ce1202-6979-46ac-88f3-83cd26a953fd.png">

## 2. 사용기술 라이브러리

- React
- TypeScript
- Styled-Component
- Recoil
- React Query
- Apexcharts

## 3. 개발일정

기간 : 2022.09.11 ~ 2022. 09. 22 (12일)  
2022.12.26 ~ 2022.12.27 (2일) 스타일링 및 기능추가 후 배포 

## 4. 개발 중 어려웠던 점

- 리액트 쿼리를 이용하여 오픈 api로부터 취득한 데이터를 map으로 뿌려주기 위하여 api response에 맞게 interface를 만들며 타입이 다를 경우 호환시키는 과정이 다소 어려웠습니다.  
- 레퍼런스를 참고할때 react-router-dom 의 버전업으로 인해 라우팅 방식이 변경되었고 구글링을 한 결과 brower router, outlet을 활용하여 개별코인을 식별하는 coinId값을 전송하였습니다.  
 <br/>
