import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../data/data";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (apiEndpoint, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}${apiEndpoint}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addData = createAsyncThunk(
  "data/addData",
  async ({ apiEndpoint, dataToAdd }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}${apiEndpoint}`, dataToAdd);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateData = createAsyncThunk(
  "data/updateData",
  async ({ apiEndpoint, id, newData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}${apiEndpoint}/${id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Assuming your API accepts JSON data
          },
        }
      );
      response.data.data[0].id = id;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async ({ apiEndpoint, id }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}${apiEndpoint}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.data.data.push(action.payload);
      })
      .addCase(addData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.data.findIndex(
          (item) => item.id === action.payload.data[0].id
        );
        if (index !== -1) {
          console.log(action.payload.data[0]);
          state.data.data[index] = action.payload.data[0];
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.data = state.data.data.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
export const {} = dataSlice.actions;
