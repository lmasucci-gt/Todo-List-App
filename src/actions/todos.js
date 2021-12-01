import { COMPLETE, SUBMIT } from "../actions-types/todos";

export const complete = (id) => ({
  type: COMPLETE,
  payload: id,
});

export const submit = (TodoID, text) => ({
  type: SUBMIT,
  payload: {
    id: TodoID,
    title: text,
    desc: null,
    completed: false,
  },
});

