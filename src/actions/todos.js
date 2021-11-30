import { COMPLETE, SUBMIT } from "../actions-types/todos";

export const complete = (id) => ({
  type: COMPLETE,
  payload: id,
});

export const submit = (text) => ({
  type: SUBMIT,
  payload: {
    id: Math.random().toString(36),
    desc: text,
    completed: false,
  },
});
