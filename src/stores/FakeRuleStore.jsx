import create from "zustand";
import ApiCall from "../api"

//crear un store
const useFakeRuleStore = create((set, get) => ({
  isLoading: false,
  hasError: false,
  errorMessage: "",
  postFakeRule: async (body = {}) => {
    if (!body) return Promise.reject('"body" es requerido');
    try {
      set(clearState);
      set({isDirty: true});

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const responseAPI = await ApiCall({
        url: "https://numethod-api-v2.herokuapp.com/api/rootsMethods/fake-rule",
        method: "POST",
        body,
        headers
      });

      set({ responseFakeRule: responseAPI });
    } catch (error) {
      console.log(error.message);
      set({
        responseFakeRule: [],
        hasError: true,
        errorMessage: error.message ? error.message : "Ups hubo un error"
      });
    } finally {
      set({ isLoading: false});
    }
  },
  isDirty: false,
  setIsDirty: () => {set({isDirty: false})},
  responseFakeRule: []
}));

const clearState = {
  isLoading: true,
  hasError: false,
  errorMessage: ""
}

export default useFakeRuleStore;