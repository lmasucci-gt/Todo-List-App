import { COMPLETE, SUBMIT } from '../actions-types/todos';

//Persistencia de datos en memoria
const initialState = [
  { id: 1, desc: "todo 1", completed: false },
  { id: 2, desc: "todo 2", completed: false },
  { id: 3, desc: "todo 3", completed: false },
];

export const complete = id => ({
  type: COMPLETE,
  payload: id,
});

export const submit = text => ({
  type: SUBMIT,
  payload: {
    id: Math.random().toString(36),
    desc: text,
    completed: false,
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE:
      console.log("disparando action")
      return state.map(x => x.id === action.payload ? ({...x, completed: !x.completed}): x)
    case SUBMIT:
      return [action.payload].concat(state);
    default:
      return state;
  }
};
