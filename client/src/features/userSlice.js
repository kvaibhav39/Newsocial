import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
  },
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    // save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        return;
      }
    );
    // save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        return;
      }
    );
    // save user after update
    builder.addMatcher(
      appApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // save user uploading user profile
    builder.addMatcher(
      appApi.endpoints.uploadUserPicture.matchFulfilled,
      (state, { payload }) => payload
    );
    // remove user after logout
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, (state) => {
      state.user = null;
      return;
    });
    builder.addMatcher(
      appApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload || [];
        return;
      }
    );
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
