import { act } from "react-dom/test-utils";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";
const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return localStorage.getItem("s10g4");
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let varMi = state.favs.every((item) => item.id !== action.payload.id);
      const NewFavList = varMi ? [state.favs] : [...state.favs, action.payload];
      toast("Favorilere eklendi!");
      writeFavsToLocalStorage(NewFavList);
      return { ...state, favs: NewFavList };

    case FAV_REMOVE:
      const NewRemFavList = state.favs.filter(
        (item) => item.id !== action.payload
      );
      writeFavsToLocalStorage(NewRemFavList);
      toast("Favori silindi!");

      return { ...state, favs: NewRemFavList };

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, loading: false, error: null };

    case FETCH_LOADING:
      return { ...state, loading: true, current: null, error: null };

    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() || [] };

    default:
      return state;
  }
}
