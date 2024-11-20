const updateAvailability = async (availabilityId, updatedData) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const response = await fetch(`/api/availabilities/${availabilityId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      dispatch({ type: "UPDATE_AVAILABILITY", payload: updatedData });
      dispatch({ type: "SET_SUCCESS" });
    } else {
      const error = await response.json();
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};
