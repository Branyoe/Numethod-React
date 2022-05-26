import create from "zustand"
import ApiCall from "../api";

const useIntegralsStore = create((set) => ({
  isLoading: false,
  hasError: false,
  errorMessage: "¡Ups! hubo un error",
  postIntegrals: async (body) => {
    if (!body) return Promise.reject('"body" es requerido');
    try {
      set({isDirty: true});
      set(clearState);

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const responseAPI = await ApiCall({
        url: "https://numethod-api-v2.herokuapp.com/api/integralsMethods/definite-integral",
        // url: "http://127.0.0.1:5000/api/integralsMethods/definite-integral",
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
        // errorMessage: error.message ? error.message : "¡Ups! hubo un error"
      });
    } finally {
      set({ isLoading: false })
    }
  },
  isDirty: false,
  setIsDirty: () => {set({isDirty: false, hasError: false, responseBisection: []})},
  responseIntegrals: []
}));

const clearState = {
  isLoading: true,
  hasError: false,
  errorMessage: "¡Ups! hubo un error"
}

export default useIntegralsStore;