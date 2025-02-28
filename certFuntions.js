const mf_exec = require("./secucert.js");

const DEFAULT_VALUE = "NULL";

function getCertInfo(callbackUrl) {
  try {
    const { authToken, certInfo } = mf_exec(callbackUrl);
    return { authToken, certInfo: certInfo.replace(/ /g, "+") };
  } catch (error) {
    console.error(error);
  }
}

function getCertResult(authToken, token) {
  try {
    const certResult = mf_exec(authToken, token);

    if (certResult?.rsltCd !== "C000") {
      throw Error(`[error] ${certResult?.rsltCd} : ${certResult?.message}`);
    }

    return {
      /** 성명 */
      name: certResult.name ?? DEFAULT_VALUE,
      /** 생년월일 */
      birth: certResult.birth ?? DEFAULT_VALUE,
      /** 내외국인 구분값 */
      nation: certResult.nation ?? DEFAULT_VALUE,
      /** CI */
      ci: certResult.ci ?? DEFAULT_VALUE,
      /** DI */
      di: certResult.di ?? DEFAULT_VALUE,
      /** CI2 */
      ci2: certResult.ci2 ?? DEFAULT_VALUE,
      /** CI 업데이트 횟수 */
      ciUpdCnt: certResult.ciUpdCnt ?? DEFAULT_VALUE,
      /** 거래일련번호 */
      txid: certResult.txid ?? DEFAULT_VALUE,
      /** 인증사업자 거래번호 */
      cxid: certResult.cxid ?? DEFAULT_VALUE,
      /** 휴대전화번호 */
      phone: certResult.phone ?? DEFAULT_VALUE,
      /** 인증사업자 코드 */
      provider: certResult.provider ?? DEFAULT_VALUE,
      /** 결과코드 */
      resultCode: certResult.resultCode ?? DEFAULT_VALUE,
      /** 결과 메시지 */
      clientMessage: certResult.clientMessage ?? DEFAULT_VALUE,
      /** 서명 데이터 */
      signedData: certResult.signedData ?? DEFAULT_VALUE,
      /** 요청 타입(인증,서명) */
      signType: certResult.signType ?? DEFAULT_VALUE,
      /** 내외국인여부 */
      nationality: certResult.nationality ?? DEFAULT_VALUE,
      /** 성별 */
      gender: certResult.gender ?? DEFAULT_VALUE,

      /** MDL 부가정보 */
      address: certResult.address ?? DEFAULT_VALUE,
      asort: certResult.asort ?? DEFAULT_VALUE,
      dlno: certResult.dlno ?? DEFAULT_VALUE,
      ihidnum: certResult.ihidnum ?? DEFAULT_VALUE,
      inspectbegend: certResult.inspectbegend ?? DEFAULT_VALUE,
      issude: certResult.issude ?? DEFAULT_VALUE,
      lcnscndcdnm: certResult.lcnscndcdnm ?? DEFAULT_VALUE,
      locpanm: certResult.locpanm ?? DEFAULT_VALUE,
      passwordsn: certResult.passwordsn ?? DEFAULT_VALUE,
      zkp: certResult.zkp ?? DEFAULT_VALUE,
      zkpsex: certResult.zkpsex ?? DEFAULT_VALUE,
      zkpasort: certResult.zkpasort ?? DEFAULT_VALUE,
      zkpaddr: certResult.zkpaddr ?? DEFAULT_VALUE,
      zkpadult: certResult.zkpadult ?? DEFAULT_VALUE,

      /** 병적증명서 */
      /** 증명서코드 */
      bctypecode: certResult.bctypecode ?? DEFAULT_VALUE,
      /** 주소 */
      bjd_addr: certResult.bjd_addr ?? DEFAULT_VALUE,
      /** 용도 */
      yongdo: certResult.yongdo ?? DEFAULT_VALUE,
      /** 군별 기재 / 미기재 */
      gbgjsincheong_yn: certResult.gbgjsincheong_yn ?? DEFAULT_VALUE,
      /** 계급 기재 / 미기재 */
      gggjsincheong_yn: certResult.gggjsincheong_yn ?? DEFAULT_VALUE,
      /** 병과(특기) 기재 / 미기재 */
      bgtggjsincheong_yn: certResult.bgtggjsincheong_yn ?? DEFAULT_VALUE,
      /** 전역구분(사유) 기재 / 미기재 */
      jygbgjsincheong_yn: certResult.jygbgjsincheong_yn ?? DEFAULT_VALUE,
      /** 역종 기재 / 미기재 */
      yjgjsincheong_yn: certResult.yjgjsincheong_yn ?? DEFAULT_VALUE,
      /** 복무분야 기재 / 미기재 */
      bmbygjsincheong_yn: certResult.bmbygjsincheong_yn ?? DEFAULT_VALUE,
      /** 복무계급 기재 / 미기재 */
      bmgggjsincheong_yn: certResult.bmgggjsincheong_yn ?? DEFAULT_VALUE,
      /** 군경력 및 기타 포함 / 미포함 */
      ggrgjsincheong_yn: certResult.ggrgjsincheong_yn ?? DEFAULT_VALUE,
      /** 군경력 및 기타 */
      ggrgjsincheong_cn: certResult.ggrgjsincheong_cn ?? DEFAULT_VALUE,
      /** 발급 접수상태 코드 */
      bgjssangtaekd: certResult.bgjssangtaekd ?? DEFAULT_VALUE,
      /** 담당자지방청 */
      damdangjajbc: certResult.damdangjajbc ?? DEFAULT_VALUE,
      /** 블록체인발급접수번호 */
      brcibgjeopsubh: certResult.brcibgjeopsubh ?? DEFAULT_VALUE,
      /** 결과코드 */
      ggcd: certResult.ggcd ?? DEFAULT_VALUE,
      /** 담당자 성명 */
      damdangjasm: certResult.damdangjasm ?? DEFAULT_VALUE,
      /** 담당자지방청코드 */
      ddjjibangcheongkd: certResult.ddjjibangcheongkd ?? DEFAULT_VALUE,
      /** 담당자연락처 */
      damdangjayrc: certResult.damdangjayrc ?? DEFAULT_VALUE,
      /** 결과 메시지 */
      ggmsg: certResult.ggmsg ?? DEFAULT_VALUE,
      /** 군복무여부 */
      gunbokmuyb: certResult.gunbokmuyb ?? DEFAULT_VALUE,
      /** 병적증명서 발급 내용 */
      bjjmsbalgeupny: certResult.bjjmsbalgeupny ?? DEFAULT_VALUE,
      /** 증명서유효기간 */
      jmsyuhyogg: certResult.jmsyuhyogg ?? DEFAULT_VALUE,
      /** 증명서사용용도 */
      jmssayongyd: certResult.jmssayongyd ?? DEFAULT_VALUE,
      /** 발행번호 */
      balhaengbh: certResult.balhaengbh ?? DEFAULT_VALUE,
      /** 발행일자 */
      balhaengij: certResult.balhaengij ?? DEFAULT_VALUE,
      bjjmsbalgeupnyReplace: certResult.bjjmsbalgeupnyReplace ?? DEFAULT_VALUE,

      /** 휴학신청서 */
      /** 성명 */
      seongmyeong: certResult.seongmyeong ?? DEFAULT_VALUE,
      /** 생년월일 */
      saengnyeonwi: certResult.saengnyeonwi ?? DEFAULT_VALUE,
      /** 입영일자 */
      ipyeongij: certResult.ipyeongij ?? DEFAULT_VALUE,
      /** 입영부대 */
      ipyeongbd: certResult.ipyeongbd ?? DEFAULT_VALUE,
      /** 입영구분 */
      ipyeonggg: certResult.ipyeonggg ?? DEFAULT_VALUE,
      /** 발급기관 */
      balgeupgg: certResult.balgeupgg ?? DEFAULT_VALUE,
      /** 통지번호 */
      tongjibh: certResult.tongjibh ?? DEFAULT_VALUE,
      /** 통지서명 */
      tongjiseomyeong: certResult.tongjiseomyeong ?? DEFAULT_VALUE,
      /** 세대주성명 */
      sedaejusm: certResult.sedaejusm ?? DEFAULT_VALUE,
      /** 관계 */
      gwangye: certResult.gwangye ?? DEFAULT_VALUE,
      /** 주소 */
      juso: certResult.juso ?? DEFAULT_VALUE,
      /** 입영일자 */
      ipyeongis: certResult.ipyeongis ?? DEFAULT_VALUE,
      /** 모이는장소 */
      moineunjs: certResult.moineunjs ?? DEFAULT_VALUE,
      /** 발급일자 */
      balgeupij: certResult.balgeupij ?? DEFAULT_VALUE,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getCertInfo,
  getCertResult,
};
