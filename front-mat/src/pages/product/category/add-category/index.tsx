// ** React Imports
import {
    forwardRef,
    MouseEvent,
    useState,
    ChangeEvent,
    useEffect,
} from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third Party Imports
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AppDispatch, RootState } from "src/store";
import { useDispatch, useSelector } from "react-redux";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Types
import { DateType } from "src/types/forms/reactDatepickerTypes";

import { addCategory, fetchCategories } from "src/store/apps/product/category";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormGroup, Switch } from "@mui/material";

import { Category } from "../../types";

interface FormInputs {
    category_name: string;
    category_slug: string;
    parent_id: number;
    description: string;
    active: boolean;
    thumbnail: string;
}

interface CustomInputProps {
    value: DateType;
    label: string;
    error: boolean;
    onChange: (event: ChangeEvent) => void;
}

const defaultValues = {
    category_name:"",
    category_slug: "",
    parent_id: "",
    description: "",
    active: true,
    thumbnail: "",
};

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: "100%" }} />;
});

const AddCategoryForm = () => {
    // ** States
    /* const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  }) */
    const dispatch = useDispatch<AppDispatch>();
    const { apiErrors } = useSelector((state: RootState) => state.category);
    const { categories } = useSelector((state: RootState) => state.category);


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

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        await dispatch(addCategory(data));
    };
    useEffect(() => {
        if (apiErrors) {
            if (apiErrors.errors.parent_id) {
                setError("parent_id", {
                    message: apiErrors.errors.parent_id[0],
                });
            }
        }
        dispatch(fetchCategories());
    }, [apiErrors]);
    return (
        <Card>
            <CardHeader
                title="Add Category"
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
                                        {errors.category_name.message}
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
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <Select
                                            value={value}
                                            label="Parent Category"
                                            onChange={(val) => onChange(val)}
                                            error={Boolean(errors.parent_id)}
                                            labelId="validation-basic-select"
                                            aria-describedby="validation-basic-select"
                                        >
                                            <MenuItem value={""}>{"No Parent Category"}</MenuItem>
                                            {categories.map((option :Category, index) => (
                                                <MenuItem key={index} value={option.id}>{option.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
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
    );
};

export default AddCategoryForm;
