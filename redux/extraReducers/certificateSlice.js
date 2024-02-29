import { createSlice } from "@reduxjs/toolkit";

export const certificateObj = {
  Certificate: "",
  Issuer: "",
  IssueDate: "",
  ExpirationDate: "",
  CredentialID: "",
  CredentialURL: ""
};

export const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    active: false,
    data: [],
  },
  reducers: {
    addCertificate: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeCertificate: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setCertificate: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addCertificate, removeCertificate, setCertificate, setActive } = certificateSlice.actions;

export default certificateSlice.reducer;