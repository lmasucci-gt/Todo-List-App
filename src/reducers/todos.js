import { COMPLETE, SUBMIT } from '../actions-types/todos';

//Persistencia de datos en memoria
const initialState = [
  { id: 1, desc: "todo 1", completed: false },
  { id: 2, desc: "todo 2", completed: false },
  { id: 3, desc: "todo 3", completed: false },
];


const todos =  (state = initialState, action) => {
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


export default todos;