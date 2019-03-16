// action types
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_LOADER = 'UPDATE_LOADER';
export const UPDATE_CASA = 'UPDATE_CASA';

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})
export const updateCasa = update => ({
  type: UPDATE_CASA,
  payload: update,
})
export const updateLoader = update => ({
  type: UPDATE_LOADER,
  payload: update,
})
export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})
