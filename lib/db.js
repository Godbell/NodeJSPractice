/*
 * 파일명: db.js
 * 생성일: 2021-02-08
 * 최종 수정일: 2021-06-06
 * 설명: Web 백엔드 서버 개발 공부: DB 연결정보 분리
 */

import mysql from "mysql";
import express from "express";
import {config} from "dotenv";

const router = express.Router();
let db_config_data = null;

config();

router.get('/dotenv', function (req, res, next) {
    db_config_data = mysql.createPool({
        host: res.send(process.env.DB_HOST),
        user: res.send(process.env.DB_USER),
        password: res.send(process.env.DB_PWD),
        database: res.send(process.env.DB_NAME)
    });
});

export let db_config = db_config_data;