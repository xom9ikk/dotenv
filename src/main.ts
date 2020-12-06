import * as core from '@actions/core';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import {
  IExportEnvVariables,
  IGeneratePathToFile,
  IGetInput,
  IMain,
  IParseEnv,
  IReadFile,
  ISetEnvVariable,
} from './interfaces';

const getInput: IGetInput = () => {
  const folder = core.getInput('folder') || '.';
  const mode = core.getInput('mode');

  return {
    folder,
    mode,
  };
};

const generatePathToFile: IGeneratePathToFile = (folder, mode) => {
  const normalizedMode = mode ? `.${mode}` : '';
  const filename = `.env${normalizedMode}`;
  return path.join(folder, filename);
};

const readFile: IReadFile = async (filePath) => new Promise<string>((
  resolve, reject,
) => fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) {
    return reject(error);
  }
  return resolve(data);
}));

const parseEnv: IParseEnv = (content) => dotenv.parse(content);

const setEnvVariable: ISetEnvVariable = ([key, value]) => {
  core.exportVariable(key, value);
};

const exportEnvVariables: IExportEnvVariables = (
  env,
) => Object.entries(env).forEach(setEnvVariable);

const main: IMain = async ({
  folder,
  mode,
}) => {
  const filePath = generatePathToFile(folder, mode);
  const content = await readFile(filePath);
  const env = parseEnv(content);
  exportEnvVariables(env);
};

(async () => {
  try {
    const input = getInput();
    await main(input);
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
