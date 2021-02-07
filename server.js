/*
 * 파일명: main.js
 * 생성일: 2021-02-07
 * 최종 수정일: 2021-02-07
 * 설명: Web 백엔드 서버 개발 공부: Resp API
 */

import express from "express";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.json());

const users = [
    {
        id: "test",
        name: "Jongha",
        email: "12191579@inha.edu"
    }
];

// GET users 데이터, {url}/api/user로 접속하여 데이터 수신
server.get("/api/user", (req,
                         res) =>
{
    res.json(users);
});

server.post("/api/user", (req,
                                    res) =>
{
    console.log(req.body);
    res.json(users);
});

// 서버 시작
server.listen(3000, () => {
    console.log("Server Running");
});

