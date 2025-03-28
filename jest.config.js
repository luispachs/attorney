import {defaults} from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  rootDir : "jest/__test__"
};

export default config;