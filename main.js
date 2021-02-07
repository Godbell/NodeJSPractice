/*
 * 파일명: main.js
 * 생성일: 2021-02-07
 * 최종 수정일: 2021-02-07
 * 설명: Web 백엔드 서버 개발 공부 시작
 */

/* MODULES */
import {ModulePrac} from "./modulePrac.js";

/* SCRIPT */
// 변수 선언
const consolePrint = "This will be printed on Console.";

// 콘솔 출력
console.log("Result: ", consolePrint);

// import한 모듈의 불러온 클래스 객체 생성
let modulePracObject = new ModulePrac();

// 클래스 메서드 사용
modulePracObject.exampleFunction();