import { COMPLETE, SUBMIT, ADDDESCRIPTION, DELETETODO, DELETEALLTASKS } from '../actions-types/todos';

//Persistencia de datos en memoria
const initialState = [];

const todos =  (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE:
      console.log("disparando action")
      return state.map(x => x.id === action.payload ? ({...x, completed: !x.completed}): x)
    case SUBMIT:
      return [action.payload].concat(state);
    case ADDDESCRIPTION:
      return state.map((x) => x.id === action.payload ? ({...x, desc: desc}): x)
    case DELETETODO:
      console.log("action payload", action.payload.id)
      return state.filter(state => state.id !== action.payload.id)
    default:
      case DELETEALLTASKS:
      return initialState
  }
};


export default todos;