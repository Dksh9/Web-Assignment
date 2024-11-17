import { create } from "zustand";

const usePhotographersStore = create((set) => ({
  photographers: [],
  fetchPhotographers: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/photographers");

      // Checking if the response is okay (status code in the range 200-299)
      if (!response.ok) {
        const errorText = await response.text(); //
        throw new Error(`Network response was not ok: ${errorText}`); //
      }

      const data = await response.json(); //
      set({ photographers: data }); // Update state with fetched photographers
    } catch (error) {
      console.error("Failed to fetch photographers:", error.message);
      set({ photographers: [] }); // Clear the photographers array on error
    }
  },
}));

export default usePhotographersStore;
