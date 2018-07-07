import { newMockCoordinator } from './mocks/mock-coordinator';
import { LocalStorage } from './mocks/mock-local-storage';
import { Window } from './mocks/mock-window';

let global: Global;

export interface Process {
  env: {
    [key: string]: string;
  };
}

export interface Global {
  process: Process;
  localStorage: LocalStorage;
  window: Window;
  fetch: Function;
}

export function mockGlobals() {
  global.process.env.EXT_CLIENT_ID = 'test';
  global.process.env.EXT_SECRET = 'test';
  global.process.env.EXT_VERSION = 'test';
  global.process.env.EXT_CHANNEL_ID = 'test';
  global.process.env.EXT_USER_NAME = 'test';

  global.localStorage = new LocalStorage();

  global.window.rig = {};
  global.window.rig.history = [];
  global.window.location = {};


  global.window['extension-coordinator'] = newMockCoordinator();
}
