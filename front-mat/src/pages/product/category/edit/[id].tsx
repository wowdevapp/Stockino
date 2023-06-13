// ** React Imports
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { fetchCategories, getCategoryById } from "src/store/apps/product/category";
import EditeForm from "./EditForm";


const EditeCategoryForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router=useRouter();
    const id = router.query.id as string;
    const {loading,selectedCategory} = useSelector((state: RootState) => state.category);
    useEffect(() => {
        dispatch(getCategoryById(id));
        dispatch(fetchCategories({}));
    },[id,dispatch])
    return (
        <>
        {loading ?(
            <div>loading</div>
        ):(
            <EditeForm category={selectedCategory} />
        )}
        </>
    );
};

export default EditeCategoryForm;
