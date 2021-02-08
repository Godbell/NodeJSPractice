/*
 * 파일명: db.js
 * 생성일: 2021-02-08
 * 최종 수정일: 2021-02-08
 * 설명: Web 백엔드 서버 개발 공부: DB 연결정보 분리
 */

import mysql from "mysql";

export let dbConnection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

dbConnection.connect();