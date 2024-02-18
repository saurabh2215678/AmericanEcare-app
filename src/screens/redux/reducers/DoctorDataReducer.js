import { DOCTOREDATA_DETAILES} from "../actiontypes/DoctoreDataTypes";
const initialState = {
  doctoreDetaile:[]
};
export default function doctorDataReducer(state = initialState, action) {
  console.log('action434343434',action.type);
  console.log('type645454554545',action)
  switch (action.type) {
    case DOCTOREDATA_DETAILES:
      return {
        ...state,
        doctoreDetaile: action.data,
      };
  
    default: {
      return state;
    }
  }
}