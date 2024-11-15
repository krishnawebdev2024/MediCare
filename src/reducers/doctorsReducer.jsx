const doctorsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "LOGIN":
      return { ...state, loading: false, doctor: action.payload };
    case "LOGOUT":
      return { ...state, loading: false, doctor: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_DOCTOR":
      return { ...state, loading: false, doctor: action.payload };
    default:
      return state;
  }
};

export default doctorsReducer;