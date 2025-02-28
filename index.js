const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const path = require("path"); // ✅ path 모듈 추가 (오류 해결)
const { getCertInfo, getCertResult } = require("./certFuntions.js");
const { isCi, isUser, insertCi } = require("./service/account.js");
const { signinAPI, signupAPI } = require("./service/api.js");
require("dotenv").config();

const app = express();
const myCallbackUrl = "http://13.209.208.71:1333/test/callback.html";
const baseUrl = "https://ida.omnione.net";

const corsOptions = {
  origin: [
    "http://localhost",
    "http://127.0.0.1",
    "http://13.209.208.71:1333",
    "null",
  ], // ✅ `127.0.0.1` 추가
  credentials: true, // ✅ 쿠키와 인증 정보를 포함한 요청 허용
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ 허용할 헤더 추가
  methods: ["GET", "POST", "OPTIONS"], // ✅ 허용할 메서드 추가
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ `OPTIONS` 프리플라이트 요청 처리

app.set("view engine", "ejs");
app.set("views", "./views");
const sess = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
});

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(sess);
app.use(express.static(path.join(__dirname, "public")));

app.get("/getCertInfo", (req, res) => {
  try {
    const callbackUrl = req.body.callbackUrl || myCallbackUrl;
    const { authToken, certInfo } = getCertInfo(callbackUrl);
    res.status(200).json({ certInfo, callbackUrl, authToken });
  } catch (e) {
    console.error("서버 에러 발생", e);
    res.status(500).send({ error: e.message || "서버 내부 오류 발생" });
  }
});

app.get("/parseResult", async (req, res) => {
  try {
    const { txId, token, authToken, fcmToken } = req.query;
    // 필수 요청값 확인
    if (!txId || !token || !authToken)
      throw new Error("필수 요청값이 누락되었습니다. (txId, token, authToken)");

    const response = await axios.post(
      baseUrl + "/oacx/api/v2.0/authen/result",
      { txId, token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 인증 결과 데이터 확인인
    if (!response.data || !response.data.token)
      throw new Error("인증 결과 데이터가 올바르지 않습니다.");

    const certResult = getCertResult(authToken, response.data.token);

    console.log(certResult);

    // 인증 성공 여부 확인
    if (certResult.resultCode != 200 || certResult.clientMessage != "성공")
      throw new Error("인증 과정에서 오류가 발생했습니다.");

    const { phone, name, ci, provider } = certResult;

    // 필수 데이터 확인
    if (!phone || !name || !ci || !provider) {
      throw new Error("필수 값이 누락되었습니다.");
    }

    if (!(await isCi(ci))) {
      // ci가 존재하지 않으면 저장
      await insertCi(phone, name, ci, provider);
    }

    const fcmTokenEx =
      fcmToken ||
      "fL-XIEqOQ2O9n5EeNaSC5A:APA91bGOluX1yglesdGU73iKTNfyRgqFs0gcrOaS6MDiATA1p9YbvMIZJdz4DwQB0XGKO9ohChrX2R4F6A2iJzwT4G_64czMi0b1GEHN8dM6y6VyOqgfA0E";
    let result;
    // 사용자 존재 여부 확인 후 회원가입 or 로그인
    if (!(await isUser(phone))) {
      result = await signupAPI(phone, name, fcmTokenEx);
    } else {
      result = await signinAPI(phone, "USER");
    }
    res.status(200).send({
      data: result || "API 응답이 없습니다.",
    });
  } catch (e) {
    console.error("서버 에러 발생", e);
    res.status(500).send({ error: e.message || "서버 내부 오류 발생" });
  }
});

app.listen(process.env.PORT, () => {
  console.info(`App is running on port http://localhost:${process.env.PORT}`);
});
