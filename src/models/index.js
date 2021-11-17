// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "DRAFT": "DRAFT",
  "PUBLISHED": "PUBLISHED"
};

const { Todo, Post, Audio } = initSchema(schema);

export {
  Todo,
  Post,
  Audio,
  PostStatus
};