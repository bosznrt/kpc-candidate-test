export const SUBMIT_DATA = 'SUBMIT_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const DELETE_DATA = 'DELETE_DATA';

export const handleSubmit = async values => {
  return { type: SUBMIT_DATA, payload: { peson: values } };
};

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT_DATA:
      return { ...state, list: [...state.list, action.payload] };
    case UPDATE_DATA:
      return { ...state, list: action.payload };
    case DELETE_DATA:
      const deleteId = action.payload;
      const deletedData = state.list.filter(person => person.id !== deleteId);
      return { ...state, list: deletedData };
    default:
      return state;
  }
}
