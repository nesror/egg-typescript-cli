// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHttpResponse from '../../../app/model/httpResponse';
import ExportLogDubboInfo from '../../../app/model/log/dubboInfo';
import ExportLogTraceLog from '../../../app/model/log/traceLog';
import ExportMongoMongoUser from '../../../app/model/mongo/mongoUser';
import ExportSqlBaseModel from '../../../app/model/sql/baseModel';
import ExportSqlUser from '../../../app/model/sql/user';

declare module 'egg' {
  interface IModel {
    HttpResponse: ReturnType<typeof ExportHttpResponse>;
    Log: {
      DubboInfo: ReturnType<typeof ExportLogDubboInfo>;
      TraceLog: ReturnType<typeof ExportLogTraceLog>;
    }
    Mongo: {
      MongoUser: ReturnType<typeof ExportMongoMongoUser>;
    }
    Sql: {
      BaseModel: ReturnType<typeof ExportSqlBaseModel>;
      User: ReturnType<typeof ExportSqlUser>;
    }
  }
}
