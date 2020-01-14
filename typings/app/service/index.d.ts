// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCache from '../../../app/service/cache';

declare module 'egg' {
  interface IService {
    cache: ExportCache;
  }
}
