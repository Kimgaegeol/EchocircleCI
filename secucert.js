const { execSync } = require("child_process");
const iconv = require("iconv-lite");

require("dotenv").config();

let cpCode = process.env.CPCODE;
let siteKey = process.env.SITEKEY;
const secuCertPath = process.env.SECUCERTPATH;

function setCpCode(arg){
  cpCode = arg;
}
function setSiteKey(arg){
  siteKey = arg;
}
function mf_exec(...args) {
  try {
    const commands = [
      secuCertPath,
      ...[cpCode, ...args, siteKey].map(escapeshellarg),
    ].join(" ");
    console.info(`[command] ${commands}`);
    const stdout = execSync(commands);
    const output = iconv.decode(stdout, "euc-kr");
    console.info(`[output] ${output}`);
    return parseSearchParams(output);
  } catch (error) {
    if (error?.stdout) {
      const message = iconv.decode(error?.stdout, "euc-kr");
      console.error(`[error] ${message}`);
    }
    throw error;
  }
}

function escapeshellarg(arg) {
  if (arg === undefined || arg === null) {
    return "";
  }

  arg = "" + arg;

  arg = arg.replace(/[^\\]'/g, function (m, i, s) {
    return s[i - 1] !== "\\" ? "\\'" : m;
  });

  return `"${arg}"`;
}

function parseSearchParams(searchParams) {
  const params = {};
  for (const [key, value] of new URLSearchParams(searchParams)) {
    params[key] = value;
  }
  return params;
}

module.exports = mf_exec;
