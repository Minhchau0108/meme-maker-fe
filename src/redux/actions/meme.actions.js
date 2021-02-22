import * as types from "../constants/meme.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const memeActions = {
  getMemes: (pageNum, limit) => async (dispatch) => {
    dispatch({ type: types.GET_MEMES_REQUEST });
    try {
      let url = `/api/memes?page=${pageNum}&perPage=${limit}`;
      const response = await api.get(url);
      dispatch({ type: types.GET_MEMES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.GET_MEMES_FAILURE, payload: error });
    }
  },
  createMeme: (image) => async (dispatch) => {
    dispatch({ type: types.CREATE_MEME_REQUEST });
    try {
      const formData = new FormData();
      formData.append("image", image);
      let url = `/api/memes`;
      const response = await api.post(url, formData);
      dispatch({
        type: types.CREATE_MEME_SUCCESS,
        payload: response.data,
      });
      toast.success("You can put your idea on the meme now!");
    } catch (e) {
      dispatch({ type: types.CREATE_MEME_FAILURE, payload: e });
    }
  },
  updateMeme: (texts, memeId) => async (dispatch) => {
    dispatch({ type: types.UPDATE_MEME_REQUEST });
    try {
      const body = { texts };
      let url = `/api/memes/${memeId}`;
      const response = await api.put(url, body);
      dispatch({ type: types.UPDATE_MEME_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({ type: types.UPDATE_MEME_FAILURE, payload: e });
    }
  },
  setSelectedMeme: (meme) => ({ type: types.SET_SELECTED_MEME, payload: meme }),
};
export default memeActions;
