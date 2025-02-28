const { loginUrl, signupUrl } = require("./../constant/url");
const axios = require("axios");

const axiosInstance = axios.create({
  // axios 기본 인스턴스 설정
  headers: {
    "Content-Type": "application/json",
  },
});

const handleAPIError = (e, apiName) => {
  // 공통 에러 핸들링 함수
  console.error(`${apiName} 요청 오류`);
  if (e.response) {
    console.error(`Status: ${e.response.status}`);
    console.error(`Data : ${JSON.stringify(e.response.data)}`);
    console.error(`Headers: ${JSON.stringify(e.response.headers)}`);
  } else {
    console.error(`Message: ${e.message}`);
  }
  throw new Error("요청 중 오류가 발생했습니다.");
};

const apiRequest = async (url, data, apiName) => {
  // API 요청 공통 함수
  try {
    const result = await axiosInstance.post(url, data);
    return result?.data || null;
  } catch (e) {
    handleAPIError(e, apiName);
  }
};

const signinAPI = async (phone, userType) => {
  return await apiRequest(loginUrl, { phone, userType }, "signin");
};

const signupAPI = async (phone, name, fcmToken) => {
  return await apiRequest(signupUrl, { phone, name, fcmToken }, "signup");
};

module.exports = { signinAPI, signupAPI };
