// ** React Imports
import { useEffect } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// ** Third Party Imports
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";

// ** Icons Imports

import { yupResolver } from "@hookform/resolvers/yup";
import { FormGroup, Switch } from "@mui/material";
import { useRouter } from "next/router";
import { editCategory } from "src/store/apps/product/category";
import * as yup from "yup";
interface FormInputs {
    category_name: string;
    category_slug: string;
    parent_id: number;
    description: string;
    active: boolean;
    thumbnail: string;
}

const EditeForm = ({category}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router=useRouter();
    const id = router.query.id as string;
    const  defaultValues ={
        id: null,
        category_name: "",
        category_slug: "",
        parent_id:null,
        description: "",
        active: true,
        thumbnail: "",
    }


    const { apiErrors,categories} = useSelector((state: RootState) => state.category);


    const schema = yup.object().shape({
        category_name: yup
            .string()
            .required("category name field is required")
            .min(3, "category name must be at least 3 characters"),
        category_slug: yup
            .string()
            .required("category slug field is required")
            .min(3, "category slug must be at least 3 characters"),
    });



    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        dispatch(editCategory(data));
    };

    useEffect(() => {
        if (apiErrors) {
            if (apiErrors?.errors?.parent_id) {
                setError("parent_id", {
                    message: apiErrors.errors.parent_id[0],
                });
            }
        }
    }, [apiErrors]);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
        watch
    } = useForm({
        defaultValues:category ?? defaultValues,
        resolver: yupResolver(schema),
    });
    return (
        <>
            <Card>
            <CardHeader
                title={"Edite Category"}
                titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name={"category_name"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            value={value}
                                            label="Category Name"
                                            onChange={onChange}
                                            placeholder="Leonard"
                                            error={Boolean(
                                                errors.category_name
                                            )}
                                        />
                                    )}
                                />
                                {errors.category_name && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                        id="validation-basic-first-name"
                                    >
                                        {errors.category_name?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name="category_slug"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            value={value}
                                            label="Category slug"
                                            onChange={onChange}
                                            placeholder="Slug"
                                            error={Boolean(
                                                errors.category_slug
                                            )}
                                        />
                                    )}
                                />
                                {errors.category_slug && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                        id="validation-basic-last-name"
                                    >
                                        {errors.category_slug.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    error={Boolean(errors.parent_id)}
                                >Parent Category</InputLabel>
                                <Controller
                                    name="parent_id"
                                    control={control}
                                    defaultValue={defaultValues}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                value={field.value || ''}
                                                label="Parent Category"
                                                onChange={(event) => field.onChange(event.target.value)}
                                                error={Boolean(field.error)}
                                                labelId="validation-basic-select"
                                                aria-describedby="validation-basic-select"
                                                placeholder="Select an option"
                                            >
                                                {categories.map((option) => (
                                                    <MenuItem selected={option.id === field.value?.id} key={option.id} value={option.id}>
                                                        {option.category_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )
                                    }}
                                />
                                {errors.parent_id && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                        id="validation-basic-select"
                                    >
                                        {errors.parent_id.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup row>
                                <Controller
                                    name="active"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            value="top"
                                            label="Active"
                                            labelPlacement="top"
                                            sx={{ mr: 8 }}
                                            control={
                                                <Switch
                                                    {...field}
                                                    checked={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            rows={4}
                                            multiline
                                            {...field}
                                            label="Bio"
                                            error={Boolean(errors.description)}
                                            aria-describedby="validation-basic-textarea"
                                        />
                                    )}
                                />
                                {errors.description && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                        id="validation-basic-textarea"
                                    >
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
        </>
    );
};

export default EditeForm;
