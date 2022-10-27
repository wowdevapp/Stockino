// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

const TabAccount = () => {
    // ** State
    const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string)

            reader.readAsDataURL(files[0])
        }
    }

    return (
        <CardContent>
            <form>
                <Grid container spacing={6}>
                    <Grid item xs={12} sx={{ my: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                            <Box>
                                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                    Company Logo
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onChange}
                                        accept='image/png, image/jpeg'
                                        id='account-settings-upload-image'
                                    />
                                </ButtonStyled>
                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='System Name' placeholder='system name' defaultValue='system name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type='number' label='Phone' placeholder='(123) 456-7890' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label='customer parent account number' placeholder='customer parent account number' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label='suppliers parent account number' placeholder='suppliers parent account number' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='General alert' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='com code' placeholder='com code' defaultValue='278373688' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                            <FormControlLabel control={<Switch defaultChecked />} label='Active' />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' sx={{ mr: 4 }}>
                            Save Changes
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary'>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default TabAccount
