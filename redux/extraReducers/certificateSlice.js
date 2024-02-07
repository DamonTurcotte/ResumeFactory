import { createSlice } from "@reduxjs/toolkit";

export const certificateObj = {
  Name: "",
  Issuer: "",
  Issue_date: "",
  Expiration_date: "",
  Credential_ID: "",
  Credential_URL: ""
};

export const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    active: false,
    certificates: [],
  },
  reducers: {
    addCertificate: (state, action) => {
      state.certificates.push(certificateObj);
    },
    removeCertificate: (state, action) => {
      const index = action.payload;
      state.certificates.splice(index, 1);
    },
    setCertificate: (state, action) => {
      state.certificates[action.payload.index] = action.payload.certificate;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addCertificate, removeCertificate, setCertificate, setActive } = certificateSlice.actions;

export default certificateSlice.reducer;