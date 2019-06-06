import { apiSubroutine } from "../external";
import { getDir } from "./getdir";
import { chdir } from "./chdir";
import ospath from "path";

export const SUBROUTINE_START = "SUBROUTINE_START";
export const SUBROUTINE_CANCEL = "SUBROUTINE_CANCEL";
export const SUBROUTINE_DONE = "SUBROUTINE_DONE";
export const SUBROUTINE_SET_PARAMETER = "SUBROUTINE_SET_PARAMETER";

export const subroutineStart = type => ({
  type: SUBROUTINE_START,
  payload: { type }
});

export const subroutineSetParameter = (key, value) => ({
  type: SUBROUTINE_SET_PARAMETER,
  payload: {
    key,
    value
  }
});

export const subroutineParameters = parameters => ({
  type: SUBROUTINE_CANCEL,
  payload: { parameters }
});

export const subroutineCancel = error => ({
  type: SUBROUTINE_CANCEL,
  payload: { error }
});

export const subroutineDone = () => ({
  type: SUBROUTINE_DONE
});

export const subroutine = ({path, type}) => async (dispatch, getState) => {
  await dispatch(subroutineStart(type));
  const state = getState();
  try {
    const res = await apiSubroutine(type, path, state.subroutine.parameters)
    if (!res.ok) {
      const json = await res.json()
      if (res.status === 400 && "parameters" in json) {
        return await dispatch(subroutineParameters(json.parameters));
      }
      return await dispatch(subroutineCancel(json.message));
    }
    if (type === "mv") {
      const json = await res.json()
      const destination = json.destination
      await dispatch(chdir(ospath.dirname(destination)));
    }
    await dispatch(subroutineStart(type))
    return await dispatch(subroutineDone())
  } catch (error) {
    await dispatch(subroutineCancel(error));
    return await dispatch(getDir());
  }
};
