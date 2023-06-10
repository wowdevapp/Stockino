// ** Redux Imports
import toast from "react-hot-toast";
import { Dispatch } from "redux";

import {
    createAsyncThunk, createSlice
} from "@reduxjs/toolkit";
// ** Axios Imports
import axios from "axios";
import authConfig from "src/configs/auth";
import backend from "src/configs/backend";

interface Category {
    id: number | null;
    category_name: String;
    category_slug: String;
    parent_id:number |null,
    description: string|null,
    active: boolean,
    thumbnail:string|null,
}


interface CategoryState {
    categories: any[];
    selectedCategory:Category |null;
    apiErrors:any,
    total:number
}

interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
}

const initialState:CategoryState={
    categories: [],
    selectedCategory: null,
    apiErrors:null,
    total:0
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
export const getCategoryById =  createAsyncThunk(
    "getCategoryById",
    async (id:number | string, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                backend.path + "/product/category/"+id,
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
    async (params:{}, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                backend.path + "/product/category",
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            authConfig.storageTokenKeyName
                        )}`,
                    },
                    params
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
    initialState,
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
            state.total=action.payload.meta.total
        });
        builder.addCase(fetchCategories.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})
        });
        //selected category
        builder.addCase(getCategoryById.fulfilled, (state, action) => {
            state.selectedCategory = action.payload.data;
            console.log(state.selectedCategory);
        });
        builder.addCase(getCategoryById.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})
        });
    },
});

export default appProductCategorySlice.reducer;
