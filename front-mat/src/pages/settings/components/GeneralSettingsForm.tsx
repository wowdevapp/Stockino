// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from "react";
import { useFormik } from "formik";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";

// ** Icons Imports
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { AppDispatch, RootState } from "src/store";
import { useDispatch, useSelector } from "react-redux";
import { addSettings } from "src/store/apps/settings";
interface MyFormValues {
    system_name: string;
    phone: string;
    customer_parent_account_number: string;
    suppliers_parent_account_number: string;
    general_alert: string;
    active: boolean;
    address: string;
}
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
        marginTop: theme.spacing(4),
    },
}));

const GeneralSettingsForm = () => {
    // ** State
    const [imgSrc, setImgSrc] = useState<string>("/images/avatars/1.png");
    const store = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    const firstValues: MyFormValues = {
        system_name: "Test",
        phone: "",
        customer_parent_account_number: "",
        suppliers_parent_account_number: "",
        general_alert: "",
        active: true,
        address: "",
    };
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: firstValues,
        onSubmit: (values) => {
            dispatch(addSettings(values));
        },
    });

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader();
        const { files } = file.target as HTMLInputElement;
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string);

            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <CardContent>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                    <Grid item xs={12} sx={{ my: 5 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ImgStyled src={imgSrc} alt="Profile Pic" />
                            <Box>
                                <ButtonStyled
                                    component="label"
                                    variant="contained"
                                    htmlFor="account-settings-upload-image"
                                >
                                    Company Logo
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="System Name"
                            placeholder="system name"
                            name="system_name"
                            value={values.system_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            placeholder="(123) 456-7890"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="customer parent account number"
                            placeholder="customer parent account number"
                            name="customer_parent_account_number"
                            value={values.customer_parent_account_number}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="suppliers parent account number"
                            placeholder="suppliers parent account number"
                            name="suppliers_parent_account_number"
                            value={values.suppliers_parent_account_number}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="General alert"
                            placeholder="ABC Pvt. Ltd."
                            name="general_alert"
                            value={values.general_alert}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Adress"
                            placeholder="adress"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="active"
                                        value={values.active}
                                        onChange={handleChange}
                                        defaultChecked
                                    />
                                }
                                label="Active"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ mr: 4 }}
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="reset"
                            variant="outlined"
                            color="secondary"
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    );
};

export default GeneralSettingsForm;
