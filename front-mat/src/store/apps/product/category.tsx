// ** Redux Imports
import toast from "react-hot-toast";
import { Dispatch } from "redux";

import {
    createAsyncThunk, createSlice
} from "@reduxjs/toolkit";
// ** Axios Imports
import api from "src/store/api.js";

interface Category {
    id: number | null;
    category_name: string;
    category_slug: string;
    parent_id:number |null,
    description: string|null,
    active: boolean,
    thumbnail:string|null,
}


interface CategoryState {
    categories: any[];
    selectedCategory:Category |null;
    apiErrors:any,
    total:number,
    loading:boolean,
}

interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
}

const initialState:CategoryState={
    categories: [],
    selectedCategory: null,
    apiErrors:null,
    total:0,
    loading:false
}
// ** Fetch categories

// ** Add Category
export const addCategory = createAsyncThunk(
    "ProductCategory",
    async (data: {}, {rejectWithValue}) => {
        try {
            const response = await api.post( "/product/category",data);
        return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }

    }
);

// ** Add Category
export const editCategory = createAsyncThunk(
    "editCategory",
    async (data:object,{rejectWithValue}) => {
        try {
            const response = await api.put(
                "/product/category/"+data.id,
                data
            );
        return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }

    }
);
export const getCategoryById =  createAsyncThunk(
    "getCategoryById",
    async (id:string, {rejectWithValue}) => {
        try {
            const response = await api.get(
                "/product/category/"+id,
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
            const response = await api.get( "/product/category",{params});
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
            state.loading=false
        });
        builder.addCase(getCategoryById.pending, (state, action:any) => {
            state.loading=true;
        });
        builder.addCase(getCategoryById.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})
        });
        builder.addCase(editCategory.fulfilled, (state, action) => {
            toast.success("category Edited succefully ?",{position: 'bottom-center'})
        });
        builder.addCase(editCategory.rejected, (state, action:any) => {
            state.apiErrors= action.payload
            toast.error(state.apiErrors?.message,{position: 'bottom-center'})
        });
    },
});

export default appProductCategorySlice.reducer;
