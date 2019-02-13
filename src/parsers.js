import fs from 'file-system';
import path from 'path';
import yaml from 'js-yaml';

const mapping = {
  json: string => JSON.parse(fs.readFileSync(string, 'utf-8')),
  yml: string => yaml.safeLoad(fs.readFileSync(string, 'utf8')),
};


export default filePath => mapping[path.extname(filePath).slice(1)](filePath);
