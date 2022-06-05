import buildMakeComment from './comment';
import buildMakeSource from './source';
import sanitize from 'sanitize-html';
import crypto from 'crypto';
import ipRegex from 'ip-regex';
import Id from '../Id';

function isValidIp(ip) {
  return ipRegex({ exact: true }).test(ip);
}

function md5(text) {
  return crypto.createHash('md5').update(text, 'utf-8').digest('hex');
}

const makeSource = buildMakeSource({ isValidIp });
const makeComment = buildMakeComment(Id, md5, sanitize, makeSource);

export default makeComment;
