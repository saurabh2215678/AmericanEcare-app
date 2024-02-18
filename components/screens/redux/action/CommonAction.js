import { COLOR_PICKER_SET } from "../actiontypes/CommonTypes";

export const color_picker_set_action = (data) => dispatch => {
  console.log("data111111",data)
      dispatch({ type: COLOR_PICKER_SET, colorrdata: data });
}

