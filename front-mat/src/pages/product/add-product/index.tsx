// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import FileUploaderSingle from "src/components/form/FileUploaderSingle";
import * as source from "src/views/forms/form-elements/file-uploader/FileUploaderSourceCode";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ButtonProps } from "@mui/material/Button";
import { ElementType, ChangeEvent, SyntheticEvent } from "react";

// ** Icons Imports
import Close from "mdi-material-ui/Close";

// ** Store Imports
import { useDispatch } from "react-redux";

// ** Actions Imports
import { addUser } from "src/store/apps/user";

// ** Types Imports
import { AppDispatch } from "src/store";
import { Grid } from "@mui/material";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import CardSnippet from "src/components/card/CardSnippet";

const ImgStyled = styled("img")(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
    ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        textAlign: "center",
    },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0,
        textAlign: "center",
        //marginTop: theme.spacing(4)
    },
}));

interface AddProductType {
    open: boolean;
    toggle: () => void;
}

interface ProductData {
    thumbnail: string;
    productType: number;
    name: string;
    p_code: number;
    category: number;
    supplier: number;
    brand: number;
    barcode_symbiology: number;
    box: number;
    unit: number;
    product_price: number;
    product_tax: number;
    tax_method: number;
    store: number;
    alert_quantity: number;
    descreption: number;
    status: number;
    order: number;
}

const showErrors = (field: string, valueLen: number, min: number) => {
    if (valueLen === 0) {
        return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
        return `${field} must be at least ${min} characters`;
    } else {
        return "";
    }
};

const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 4),
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
}));

const schema = yup.object().shape({
    product_type: yup.string().required(),
    category: yup.string().required(),
    supplier: yup.string().email().required(),
    p_code: yup
        .number()
        .typeError("Contact Number field is required")
        .min(10, (obj) =>
            showErrors("Contact Number", obj.value.length, obj.min)
        )
        .required(),
    name: yup
        .string()
        .min(3, (obj) => showErrors("Name", obj.value.length, obj.min))
        .required(),
    brand: yup
        .string()
        .min(3, (obj) => showErrors("p_code", obj.value.length, obj.min))
        .required(),
});

const defaultValues = {
    thumbnail: "",
    product_type: "",
    name: "",
    p_code: "",
    category: "",
    supplier: "",
    brand: "",
    barcode_symbiology: "",
    box: "",
    unit: "",
    product_price: "",
    product_tax: "",
    tax_method: "",
    store: "",
    alert_quantity: "",
    descreption: "",
    status: "",
    order: "",
};

const index = (props: AddProductType) => {
    // ** Props
    const { open, toggle } = props;

    // ** State
    const [plan, setPlan] = useState<string>("basic");
    const [role, setType] = useState<string>("subscriber");
    const [imgSrc, setImgSrc] = useState<string>("/images/avatars/1.png");

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>();
    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ProductData) => {
        dispatch(addUser({ ...data, role, currentPlan: plan }));
        toggle();
        reset();
    };

    const handleClose = () => {
        setPlan("basic");
        setType("subscriber");
        toggle();
        reset();
    };

    //const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader();
        const { files } = file.target as HTMLInputElement;
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string);

            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <Card>
            <Header>
                <Typography variant="h6">Add Product</Typography>
            </Header>
            <Box sx={{ p: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            value={value}
                                            label="Product Name"
                                            onChange={onChange}
                                            placeholder="Product one"
                                            error={Boolean(errors.name)}
                                        />
                                    )}
                                />
                                {errors.name && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                    >
                                        {errors.name.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name="p_code"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            value={value}
                                            label="P code"
                                            onChange={onChange}
                                            placeholder="p code"
                                            error={Boolean(errors.p_code)}
                                        />
                                    )}
                                />
                                {errors.p_code && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                    >
                                        {errors.p_code.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel id="role-select">
                                    Product type
                                </InputLabel>
                                <Select
                                    fullWidth
                                    value={role}
                                    id="product_type"
                                    label="product_type"
                                    labelId="product_type"
                                    onChange={(e) => setType(e.target.value)}
                                    inputProps={{ placeholder: "product_type" }}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                    <MenuItem value="editor">Editor</MenuItem>
                                    <MenuItem value="maintainer">
                                        Maintainer
                                    </MenuItem>
                                    <MenuItem value="subscriber">
                                        Subscriber
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel id="role-select">
                                    Category
                                </InputLabel>
                                <Select
                                    fullWidth
                                    value={role}
                                    id="Category"
                                    label="Category"
                                    labelId="category"
                                    onChange={(e) => setRole(e.target.value)}
                                    inputProps={{ placeholder: "category" }}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                    <MenuItem value="editor">Editor</MenuItem>
                                    <MenuItem value="maintainer">
                                        Maintainer
                                    </MenuItem>
                                    <MenuItem value="subscriber">
                                        Category 1
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel id="role-select">
                                    Supplier
                                </InputLabel>
                                <Select
                                    fullWidth
                                    value={role}
                                    id="supplier"
                                    label="supllier"
                                    labelId="suplier"
                                    onChange={(e) => setRole(e.target.value)}
                                    inputProps={{ placeholder: "supplier" }}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                    <MenuItem value="editor">Editor</MenuItem>
                                    <MenuItem value="maintainer">
                                        Maintainer
                                    </MenuItem>
                                    <MenuItem value="subscriber">
                                        Supplier 1
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name="brand"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            value={value}
                                            label="Brand"
                                            onChange={onChange}
                                            placeholder="brand"
                                            error={Boolean(errors.name)}
                                        />
                                    )}
                                />
                                {errors.brand && (
                                    <FormHelperText
                                        sx={{ color: "error.main" }}
                                    >
                                        {errors.brand.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="role-select">
                            barcode symbiology
                        </InputLabel>
                        <Select
                            fullWidth
                            value={role}
                            id="barcode_symbiology"
                            label="barcode symbiology"
                            labelId="barcode_symbiology"
                            onChange={(e) => setRole(e.target.value)}
                            inputProps={{ placeholder: "barcode symbiology" }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="author">Author</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="maintainer">Maintainer</MenuItem>
                            <MenuItem value="subscriber">code 1</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="role-select">Box</InputLabel>
                        <Select
                            fullWidth
                            value={role}
                            id="box"
                            label="box"
                            labelId="box"
                            onChange={(e) => setRole(e.target.value)}
                            inputProps={{ placeholder: "box" }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="author">Author</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="maintainer">Maintainer</MenuItem>
                            <MenuItem value="subscriber">box 1</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="role-select">Unit</InputLabel>
                        <Select
                            fullWidth
                            value={role}
                            id="unit"
                            label="unit"
                            labelId="unit"
                            onChange={(e) => setRole(e.target.value)}
                            inputProps={{ placeholder: "unit" }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="author">Author</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="maintainer">Maintainer</MenuItem>
                            <MenuItem value="subscriber">unit 1</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid item xs={12} sx={{ my: 5 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ImgStyled src={imgSrc} alt="Profile Pic" />
                            <Box>
                                <ButtonStyled
                                    component="label"
                                    variant="contained"
                                    htmlFor="account-settings-upload-image"
                                >
                                    Upload New Photo
                                    <input
                                        hidden
                                        type="file"
                                        onChange={onChange}
                                        accept="image/png, image/jpeg"
                                        id="account-settings-upload-image"
                                    />
                                </ButtonStyled>
                                <ResetButtonStyled
                                    color="error"
                                    variant="outlined"
                                    onClick={() =>
                                        setImgSrc("/images/avatars/1.png")
                                    }
                                >
                                    Reset
                                </ResetButtonStyled>
                                <Typography
                                    sx={{ mt: 4 }}
                                    component="p"
                                    variant="caption"
                                >
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "12px",
                        }}
                    >
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ mr: 3 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Card>
    );
};

export default index;
