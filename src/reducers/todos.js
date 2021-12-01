import { COMPLETE, SUBMIT } from '../actions-types/todos';

//Persistencia de datos en memoria
const initialState = [
  { id: 1, title: 'First task', desc: "Install dependencies", completed: false },
  { id: 2, title: 'Second task', desc: "Scaffolding", completed: false },
];


const todos =  (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE:
      console.log("disparando action")
      return state.map(x => x.id === action.payload ? ({...x, completed: true}): x)
    case SUBMIT:
      return [action.payload].concat(state);
    default:
      return state;
  }
};


export default todos;