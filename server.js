/*
 * 파일명: main.js
 * 생성일: 2021-02-07
 * 최종 수정일: 2021-02-08
 * 설명: Web 백엔드 서버 개발 공부: Rest API with MySQL
 */

import express from "express";
import bodyParser from "body-parser";
import { dbConnection } from "./lib/db.js";

const server = express();
server.use(bodyParser.json());

// GET cmembers 데이터, {url}/api/member/get-all로 접속하여 데이터 수신
server.get("/api/member/get-all", (req,
                           res) => {
    let sqlQuery = "SELECT * FROM CMembers";    // query string
    try {
        dbConnection.query                      // send query to MySQL
        (
            sqlQuery
            , function (err, rows, fields) {
                if (err) {                      // error occured
                    res.status(500).send("Internal Server Error");
                    console.log(err);
                }
                else {
                    res.send(rows);
                }
            }
        )
    } catch (e) {
        console.log(e);
    }
});

// POST cmembers 데이터, {url}/api/member/add에 JSON 형식으로 리퀘스트를 전송해 데이터 추가
server.post("/api/member/add", (req,
                            res) => {
    console.log(req.body);

    let reqJson = req.body;             // JSON 형식으로 리퀘스트 온 데이터 변환

    let resString = {                   // 유효성을 체크하기 위한
        idValidance: "Valid",
        NameValidance: "Valid",
        MajorValidance: "Valid",
        PhoneNumberValidance: "Valid",
        EmailValidance: "Valid",
        GradeValidance: "Valid",
        ValidData: true,
        PostSucceeded: false
    };

    // 유효하지 않은 데이터를 거르기 위한 string 필터
    let nameFormat                                                  // 특수문자 제외
        = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let majorFormat                                                 // 한글만 포함
        = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    let phoneNumberFormat                                           // +와 숫자만 포함
        = /[ `!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]/;

    // filter id
    if (reqJson['Id'] < 10000000 || reqJson['Id'] > 99999999)
    {
        resString.ValidData = false;
        resString.idValidance = "Invalid Id Taken";
    }

    // filter Name
    if (nameFormat.test(reqJson['Name']))
    {
        resString.ValidData = false;
        resString.NameValidance = "Invalid Name. No special characters allowed.";
    }

    // filter Major
    if (majorFormat.test(reqJson['Major']))
    {
        resString.ValidData = false;
        resString.MajorValidance = ("Invalid Major Name. No special characters and alphabets allowed.");
    }

    // filter PhoneNumber
    if (phoneNumberFormat.test(reqJson['PhoneNumber']))
    {
        resString.ValidData = false;
        resString.PhoneNumberValidance = ("Invalid Phone number. + is the only special character allowed.");
    }

    // filter Email
    if (!reqJson['Email'].includes("@")
        || reqJson['Email'].split('@')[0].length < 1
        || reqJson['Email'].split('@')[1].length < 1)
    {
        resString.ValidData = false;
        resString.EmailValidance = ("Invalid Email Address.");
    }

    // filter Grade
    if (reqJson['Grade'] < 1 || reqJson['Grade'] > 10)
    {
        resString.ValidData = false;
        resString.GradeValidance = ("Invalid Grade.");
    }

    if (resString.ValidData)    // 요청받은 데이터가 유효하다면
    {
        let sqlQuery =          // INSERT 쿼리를 보낸다
            "INSERT INTO CMembers (Id, Name, Major, PhoneNumber, Email, Grade, Comment) "
            + "VALUES ("
            + "\"" + reqJson['Id'] + "\"" +  ","
            + "\"" + reqJson['Name'] + "\"" + ","
            + "\"" + reqJson['Major'] + "\"" + ","
            + "\"" + reqJson['PhoneNumber'] + "\"" + ","
            + "\"" + reqJson['Email'] + "\"" + ","
            + "\"" + reqJson['Grade'] + "\"" + ","
            + "\"" + reqJson['Comment'] + "\""
            + ")";

        dbConnection.query(sqlQuery, function (err, rows, fields) {
            if (err)
            {
                console.log(err);
                resString.PostSucceeded = false;
            }
            else
            {
                console.log(rows);
                resString.PostSucceeded = true;
            }
        });
    }

    res.send(resString);
});

// 서버 시작
server.listen(3000, () => {
    console.log("Server Running");
});

