import create from "zustand";
import ApiCall from "../api"

//crear un store
const useBisectionStore = create((set, get) => ({
  isLoading: false,
  hasError: false,
  errorMessage: "",
  postBisection: async (body = {}) => {
    if (!body) return Promise.reject('"body" es requerido');
    try {
      set({isDirty: true})
      set(clearState);

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const responseAPI = await ApiCall({
        url: "https://numethod-api-v2.herokuapp.com/api/rootsMethods/bisection",
        method: "POST",
        body,
        headers
      });

      if(Array.isArray(responseAPI)) {set({ responseBisection: responseAPI }); return};
      
      throw responseAPI;
    } catch (error) {
      set({
        responseBisection: [],
        hasError: true,
        errorMessage: error.message ? error.message : "Ups hubo un error"
      });
    } finally {
      set({ isLoading: false })
    }
  },
  isDirty: false,
  setIsDirty: () => {set({isDirty: false})},
  responseBisection: []
}));

const clearState = {
  isLoading: true,
  hasError: false,
  errorMessage: ""
}

export default useBisectionStore;