import * as core from '@actions/core';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
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
  const pathToFolder = core.getInput('path') || '.';
  const mode = core.getInput('mode');
  const loadMode = core.getInput('load-mode') || 'strict';

  return {
    pathToFolder,
    mode,
    loadMode,
  };
};

const generatePathToFile: IGeneratePathToFile = (pathToFolder, mode) => {
  const normalizedMode = mode ? `.${mode}` : '';
  const filename = `.env${normalizedMode}`;
  return path.join(pathToFolder, filename);
};

const readFile: IReadFile = async (filePath, loadMode) => new Promise<string>((
  resolve, reject,
) => fs.readFile(filePath, 'utf8', (error, data) => {
  if (error && loadMode !== 'skip') {
    return reject(error);
  } if (error && loadMode === 'skip') {
    return resolve('');
  }
  return resolve(data);
}));

const parseEnv: IParseEnv = (
  content,
) => dotenvExpand.expand({ parsed: dotenv.parse(content) }).parsed;

const setEnvVariable: ISetEnvVariable = ([key, value]) => {
  core.exportVariable(key, value);
};

const exportEnvVariables: IExportEnvVariables = (
  env,
) => Object.entries(env).forEach(setEnvVariable);

const main: IMain = async ({
  pathToFolder,
  mode,
  loadMode,
}) => {
  const filePath = generatePathToFile(pathToFolder, mode);
  const content = await readFile(filePath, loadMode);
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
