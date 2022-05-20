import create from "zustand"
import ApiCall from "../api";

const useIntegralsStore = create((set, get) => ({
  isLoading: false,
  hasError: false,
  errorMessage: "",
  postIntegrals: async (body = {}) => {
    if (!body) return Promise.reject('"body" es requerido');
    try {
      set(clearState);

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const responseAPI = await ApiCall({
        url: "https://numethod-api-v2.herokuapp.com/api/integralsMethods/defined-integrals",
        method: "POST",
        body,
        headers
      });

      set({ responseIntegrals: responseAPI });
    } catch (error) {
      console.log(error.message);
      set({
        responseIntegrals: [],
        hasError: true,
        errorMessage: error.message ? error.message : "Ups hubo un error"
      });
    } finally {
      set({ isLoading: false })
    }
  },
  responseIntegrals: []
}));

const clearState = {
  isLoading: true,
  hasError: false,
  errorMessage: ""
}

export default useIntegralsStore;