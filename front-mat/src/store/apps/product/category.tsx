// ** Redux Imports
import { Dispatch } from "redux";
import toast from "react-hot-toast";

import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
    PayloadAction,
} from "@reduxjs/toolkit";
import { setError } from "../../slices/errorSlice";
// ** Axios Imports
import axios, { AxiosError } from "axios";
import backend from "src/configs/backend";
import authConfig from "src/configs/auth";
import { ApiError } from "next/dist/server/api-utils";

interface Category {
    category_name: String;
    category_slug: String;
    id: number | null;
}


interface CategoryState {
    categories: Category[];
    selectedCategory:Category |null;
}

interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
}

// ** Fetch categories

// ** Add Category
export const addCategory = createAsyncThunk(
    "ProductCategory",
    async (data: {}, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                backend.path + "/product/category",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            authConfig.storageTokenKeyName
                        )}`,
                    },
                }
            );
        return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
        
    }
);

export const fetchCategories= createAsyncThunk(
    "fetchCategories",
    async ({}, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                backend.path + "/product/category",
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            authConfig.storageTokenKeyName
                        )}`,
                    },
                }
            );
        return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
        
    }
);

export const appProductCategorySlice = createSlice({
    name: "ProductCategory",
    initialState:{
        categories: [],
        selectedCategory: null,
        apiErrors:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload.data);
            toast.success("category added succefully ?",{position: 'bottom-center'})
        });
        builder.addCase(addCategory.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})
            
        });
        //fetch categories
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload.data;
            //toast.success("category added succefully ?",{position: 'bottom-center'})
        });
        builder.addCase(fetchCategories.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})           
        });
    },
});

export default appProductCategorySlice.reducer;
