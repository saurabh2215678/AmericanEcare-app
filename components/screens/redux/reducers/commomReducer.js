import { COLOR_PICKER_SET} from "../actiontypes/CommonTypes";
const initialState = {
  colorrdata:[]
};
export default function commomReducer(state = initialState, action) {
  console.log('action434343434',action.type);
  console.log('type645454554545',action)
  switch (action.type) {
    case COLOR_PICKER_SET:
      return {
        ...state,
        colorrdata: action.colorrdata,
      };
  
    default: {
      return state;
    }
  }
}