import * as joi from 'joi';

const course = joi.object({
  title: joi.string().required(),
  author: joi.number().required(),
  subtitle: joi.string(),
});

const unit = joi.object({
  title: joi.string().required(),
  isIntroduction: joi.boolean().required(),
  sequence: joi.number().required(),
});

const content = joi.object({
  title: joi.string().required(),
  sequence: joi.number().required(),
  content: joi.string().required(),
  type: joi.string().only(),
});

export default {
  course,
  unit,
};
