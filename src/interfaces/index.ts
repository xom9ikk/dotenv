import { DotenvParseOutput } from 'dotenv';

export interface IInput {
  pathToFolder?: string,
  mode?: string,
}

export type IGetInput = () => IInput;
export type IMain = (input: IInput) => void;
export type IGeneratePathToFile = (folder: string, mode: string) => string;
export type IReadFile = (filePath: string) => Promise<string>;
export type IParseEnv = (IParseEnv: string) => DotenvParseOutput;
export type ISetEnvVariable = (key: [string, string]) => void;
export type IExportEnvVariables = (env: DotenvParseOutput) => void;
