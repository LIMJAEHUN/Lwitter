# 1일차
- firebase react를 활용한 트위터 클론코딩 시작
- firebase 설치후 실행시 오류 발생
- v8 -> v9 업데이트 할 경우 compat사용해야함
# 2일차
- 비밀키 숨기기 진행
- Hooks 사용
- react-router-dom 사용
- 이전 버전이랑 최신버전 변경됨 switch -> routes로 변경
- 책 진행을 위해 다운그레이드 진행하기로 결정
# 3일차
- useState 함수 위치 이동
- 절대 경로 설정
- 절대 경로 설정중 오류 절대경로 가 읽히지 않는다(수정 o)
# 4~5일차
- 오류 수정 진행
- 절대 경로 오류 .env 에 NODE_PATH=src 추가 하여 해결
- 파이어베이스 인증모듈 오류 1일차에서 발생한 이유와 동일 버전에 맞는 양식으로 수정후 정상 작동
# 6일차
- 파이어베이스 로그인 설정(이메일 비밀번호 로그인, 구글 로그인 깃허브 로그인 등록)
- onchage, onsubmit 함수 사용 히여 로그인 폼이 상태를 업데이트하도록 만듬
- 회원가입 로그인 분리
- async, await 사용하여 결과값 수신 대기
- useEffect 결과값 수신시 작동하도록 만듬
- 오류 메시지 출력
- 로그인 로그아웃 버튼 통일 
# 7일차
- 갑자기 api 키 오류 문제 발생
- 정확한원인은 아직 모르나 env파일 재 작성으로 해결 된걸로 보아 서버 문제인거 같음
- 소셜로그인 진행 
# 8일차
- 소셜 로그인 완료
- 로그아웃 기능 구현
- 트윗 등록을위한 폼 구현
- 파이어베이스 DB설정
- 데이터 추가 중 오류 발생 Uncaught (in promise) FirebaseError: Request failed with error: 정확한 원인 파악중
- 회원 가입 , 이메일 비밀번호 로그인 오류 뒤늦게 발견 후 수정(단순 버전 문제)
# 9~11일차
- 파이어베이스 오류 수정 진행중
- 코드 자체 문제보다 환결설정 혹은 파이어베이스 설정문제라고 추측중
- 파이어베이스 환경설정에서 app 변서 선언 했으나 인식 문제로 에러 수정을 위한 소스 추가eslint-disable-line no-unused-vars
- 데이터 추가시 권한이 거부 당해 파이어베이스에 등록이 안되는거 같음
- 규칙 시뮬레이터 테스트 결과 규칙에는 문제가 없는거 같음
# 12일차
- 파이어베이스 권한 접근 문제 해결 보안 상의 문제로 추정되어 저번에 파이어베이스 규칙문제로 예상
- 프로젝트 새로 생성 전프로젝트는 보안이 낮은 테스트모드로 생성하여 거부당한걸로 추정 프로덕션 모드로 재생성후 문제해결
- 글작성 기능 정상작동 저장 확인
- 작성한 글 출력 성공
- 글 작성한 사용자 uid 추가하여 작성한 작성자 확인
# 13일차
- 트윗 기능 사용시 작성한 글이 새로고침 해야 보임 글 작성시 새로고침없이 바로 보이도록 get에서 onsnapshot 함수 사용으로 교체 
- onsnapshot 함수 사용시 import 충돌 문제 발생
- 이전 v9버전으로 firestore 임포트할때 경로 오류발생하여 lite 사용한것이 원인 (수정 O)
- 수정 삭제 버튼 구현을 위해 트위 컴포넌트 분리 한 Lweets.js 작성
- 사용자 uid 랑 DB에 작성한 creator.id가 동일한 사용자만 작성한 트윗을 수정 삭제 하도록 구현중
- 현재 uid랑 creator.id 가 동일하지만 버튼이 보이지 않는 문제 발생 
# 14일차
- 사용자 creator.id 랑 사용자 uid 오류 추적 진행 두 값이 값으면 isOwner 가 true가 넘어와야 하는데
false이 넘어옴
- 오타 인한 creator.id 값을 못찾는 사실 확인 후 수정완료
- 트윗 수정 기능 구현 onChange 함수로 이벤트 확인 
- 사진 첨부(사진 미리보기, 사진 취소 )
# 15일차
- 사진 첨부 기능 이어서 진행
- 고유 식별자 를 만들어주는 uuid 사용
- 스토리지 개념 공부 예정
- 스토리지에 파일저장 진행중 스토리지 규칙 설정으로 인한 오류 발생(권한 부여 수정)
- 현재 getDownloadURL 함수 사용중 url반환이 안되는 상황 발생
- 사진 이랑 메세지 동시 작성시 데이터베이스에 url 값이 들어가야하는데 필드 값이 생성이 안되고 저장안되서
- Db의 메세지랑 스토리지의 사진 이 매치가 안되는거 같다고 추정중  
# 16~17일차
- storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트 해야하는데 경로 설정 오류 로인한 사진 저장 오류 문제 해결
- base64 format error 오류 해결
- 사진만 업로드시 정상작동 되지만 트윗메세지만 작성 attachment 필드에 오류 발생 사진이 없으면  공백값을 넣도록 수정
- 프로필 페이지에 내가 작성한 트윗만 볼수 있도록 진행중
- 복합 색인 만들기 진행(복합 색인 공부하기)
- 프로필 페이지에 내가 작성한 트윗 값 전달 확인
- 색인 공부
- 프로필 출력 진행, 로그 값이 출력은 되지만 사진이 안나옴
# 18일차
- 프로필 업데이트 진행
- updateProfile 함수 오류
- 최신 버전에 맞는 소스코드로 교체 
# 19일차
- 프로필 실시간 업데이트 진행
- 프로필 업데이트 두번 누르면  getIdToken  함수 에러 발생
- 유저 정보 호출하는 과정에서 getidtoken을 찾지 못하는 것으로 예상
- Auth 패키지의 updateCurrentUser 함수 사용하여 호출 문제 해결(참조 https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#updatecurrentuser)

# 20일차
- 소스 코드 정리
- auth, home 컴포넌트 나누기 작업 진행
- 배포 진행중
- mainfest 오류(주소 오류로 추정)

# 21일차
- gitio 배포 진행 완료
- mainfest 오류 해결
# 22일차
- profile 페이지 내가 쓴 트윗만 출력
- 삭제 수정 버튼 및 컴포넌트 분리 작업 진행 예정
# 23~24일차
- 복습
- 추후 작업 (에러 메세지 처리, 프로필 페이지 삭제 수정 버튼 및 컴포넌트 분리 작업 진행 예정)
# 25~26일차
- 복습 진행
- 프로필 페이지 삭제 수정 버튼 생성
- 프로필 페이지 컴포넌트 분리 하려했으나 추후 기능이 늘어 나지 않으면 굳이 나눌필요가 없다 생각하여 잠시 보류
# 27일차
- 디자인 반영후 점검 (button 수정 및 body 삭제)
- 로그인 관련 에러 영문 에러에서 한글에러로 수정
