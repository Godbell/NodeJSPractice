/*
 * 파일명: db_template.js
 * 생성일: 2021-02-08
 * 최종 수정일: 2021-06-06
 * 설명: Web 백엔드 서버 개발 공부: DB 연결정보 분리
 */

import mysql from "mysql";

let db_config_data = null;

config();

db_config_data = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});

export let db_config = db_config_data;