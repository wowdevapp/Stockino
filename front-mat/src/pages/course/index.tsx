import { Grid, Typography } from '@mui/material'
import StepperClassForm from './components/StepperFormClass'

const index = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h6'>Linear Stepper with Validation</Typography>
            </Grid>
            <Grid item xs={12}>
                <StepperClassForm />
            </Grid>
        </Grid>
    )
}

export default index
