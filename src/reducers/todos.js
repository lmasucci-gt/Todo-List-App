import { COMPLETE, SUBMIT, ADDDESCRIPTION, DELETETODO, DELETEALLTASKS } from '../actions-types/todos';

//Persistencia de datos en memoria
const initialState = [];

const todos =  (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE:
      return state.map(x => x.id === action.payload ? ({...x, completed: !x.completed}): x)
    case SUBMIT:
      return [action.payload].concat(state);
    case ADDDESCRIPTION:
      return state.map((x) => x.id === action.payload ? ({...x, desc: desc}): x)
    case DELETETODO:
      return state.filter(state => state.id !== action.payload.id)
    default:
      case DELETEALLTASKS:
      return initialState
  }
};


export default todos;