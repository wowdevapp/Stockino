// ** Redux Imports
import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import backend from "src/configs/backend";
import authConfig from "src/configs/auth";

interface DataParams {
    q: string;
    role: string;
    status: string;
    currentPlan: string;
}

interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
    "settings/fetchData",
    async (params: DataParams) => {
        const response = await axios.get(backend.path + "/settings", {
            params,
        });

        return response.data;
    }
);

// ** Add User
export const addSettings = createAsyncThunk(
    "appSettings",
    async (data: {}, { getState, dispatch }: Redux) => {
      console.log(data)
        const response = await axios.post(
            backend.path + "/save-settings",data,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        authConfig.storageTokenKeyName
                    )}`,
                },
            }
        );
        console.log('save with success')
        //dispatch(fetchData(getState().user.params));

        return response.data;
    }
);

export const appSettingsSlice = createSlice({
    name: "appSettings",
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload.users;
            state.total = action.payload.total;
            state.params = action.payload.params;
            state.allData = action.payload.allData;
        });
    },
});

export default appSettingsSlice.reducer;
