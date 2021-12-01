import { COMPLETE, SUBMIT } from "../actions-types/todos";

export const complete = (id) => ({
  type: COMPLETE,
  payload: id,
});

export const submit = (text, description) => ({
  type: SUBMIT,
  payload: {
    id: Math.random().toString(36),
    title: text,
    desc: description,
    completed: false,
  },
});
