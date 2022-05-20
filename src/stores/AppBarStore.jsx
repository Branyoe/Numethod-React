import create from "zustand";

const useAppBarStore = create((set, get) => ({
  currentRoute: "",
  setCurrentRoute: (route = "") => {
    set({ currentRoute: route });
  }
}));

export default useAppBarStore;