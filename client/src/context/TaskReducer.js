export const TaskReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE_TASK":
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );

      state.tasks[index] = action.payload;
      return {
        ...state,
        tasks: state.tasks,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        option: action.option,
      };
    case "TASK_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
