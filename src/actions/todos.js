import {
  COMPLETE,
  SUBMIT,
  ADDDESCRIPTION,
  DELETETODO,
  DELETEALLTASKS,
} from "../actions-types/todos";

export const complete = (TodoID) => ({
  type: COMPLETE,
  payload: TodoID,
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
    id: TodoID,
    desc: TodoDesc,
  },
});

export const deleteToDo = (TodoID) => ({
  type: DELETETODO,
  payload: {
    id: TodoID,
  },
});

export const deleteAllTasks = () => ({
  type: DELETEALLTASKS,
});
