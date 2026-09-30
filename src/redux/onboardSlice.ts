import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface BookingState {
  userId: string;
  spaId: string;
}
const initialState: BookingState = {
  userId: "",
  spaId: "",
};

const onboardSlice = createSlice({
    name :"onboard",
    initialState,

    reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
    state.userId = action.payload;
    },
    setSpaId: (state, action: PayloadAction<string>) => {
      state.spaId = action.payload;
    },
      clearOnboard: (state) => {
      state.userId = "";
      state.spaId = "";
    },
    }
});

export const {setUserId , setSpaId  , clearOnboard} = onboardSlice.actions;
export default onboardSlice.reducer;