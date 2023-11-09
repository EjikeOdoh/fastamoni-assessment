import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  fullName: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const {setToken, setName} = profileSlice.actions;
export default profileSlice.reducer;
