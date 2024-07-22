import * as fs from 'fs';
import * as path from 'path';
import * as joi from 'joi';
import * as toml from 'toml';

interface IConfig {
  app: {
    ns: string;
    stage: string;
  };
  knowledgeBase: {
    name: string;
    dataSourceName: string;
  };
}

const cfg = toml.parse(
  fs.readFileSync(path.resolve(__dirname, '..', '.toml'), 'utf-8')
);
console.log('loaded config', cfg);

const schema = joi
  .object({
    app: joi
      .object({
        ns: joi.string().required(),
        stage: joi.string().required(),
      })
      .required(),
    knowledgeBase: joi
      .object({
        name: joi.string().required(),
        dataSourceName: joi.string().required(),
      })
      .required(),
  })
  .unknown();

const { error } = schema.validate(cfg);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const Config: IConfig = {
  ...cfg,
  app: {
    ...cfg.app,
    ns: `${cfg.app.ns}${cfg.app.stage}`,
  },
};
