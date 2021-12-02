import { COMPLETE, SUBMIT, ADDDESCRIPTION } from "../actions-types/todos";

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

export const addDescription = (TodoID, TodoDesc) => ({
    type: ADDDESCRIPTION,
    payload: {
      id:TodoID,
      desc: TodoDesc,
    }
})

