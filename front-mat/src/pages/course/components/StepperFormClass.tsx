// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

// ** Icons Imports
// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

interface State {
    password: string
    password2: string
    showPassword: boolean
    showPassword2: boolean
}

const steps = [
    {
        title: 'Class Info',
        subtitle: 'Enter Class  Details'
    },
    {
        title: 'Teacher Location',
        subtitle: 'Setup Information'
    },
    {
        title: 'Date and Time',
        subtitle: 'Add Social Links'
    },
    {
        title: 'Price',
        subtitle: 'Add your price'
    }
]

const classInfoValues = {
    categories: [],
    title: '',
    description: '',
    'class-level': []
}
const defaultPersonalValues = {
    country: '',
    language: [],
    'last-name': '',
    'first-name': ''
}
const defaultSocialValues = {
    google: '',
    twitter: '',
    facebook: '',
    linkedIn: ''
}

const classInfoSchema = yup.object().shape({
    title: yup.string().required(),
    categories: yup.array().min(1).required(),
    description: yup.string().required(),

})
const personalSchema = yup.object().shape({
    country: yup.string().required(),
    'last-name': yup.string().required(),
    'first-name': yup.string().required(),
    language: yup.array().min(1).required()
})
const socialSchema = yup.object().shape({
    google: yup.string().required(),
    twitter: yup.string().required(),
    facebook: yup.string().required(),
    linkedIn: yup.string().required()
})

const StepperClassForm = () => {
    // ** States
    const [activeStep, setActiveStep] = useState<number>(0)
    const [state, setState] = useState<State>({
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false
    })

    // ** Hooks
    const {
        reset: accountReset,
        control: classInfoControl,
        handleSubmit: handleClassInfoSubmit,
        formState: { errors: classInfoErrors }
    } = useForm({
        defaultValues: classInfoValues,
        resolver: yupResolver(classInfoSchema)
    })
    const {
        reset: personalReset,
        control: personalControl,
        handleSubmit: handlePersonalSubmit,
        formState: { errors: personalErrors }
    } = useForm({
        defaultValues: defaultPersonalValues,
        resolver: yupResolver(personalSchema)
    })
    const {
        reset: socialReset,
        control: socialControl,
        handleSubmit: handleSocialSubmit,
        formState: { errors: socialErrors }
    } = useForm({
        defaultValues: defaultSocialValues,
        resolver: yupResolver(socialSchema)
    })

    // Handle Stepper
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    const handleReset = () => {
        setActiveStep(0)
        socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
        accountReset({ categories: [], title: '', description: '' })
        personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
    }
    const onSubmit = () => {
        setActiveStep(activeStep + 1)
        if (activeStep === steps.length - 1) {
            toast.success('Form Submitted')
        }
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <form key={0} onSubmit={handleClassInfoSubmit(onSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {steps[0].title}
                                </Typography>
                                <Typography variant='caption' component='p'>
                                    {steps[0].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='title'
                                        control={classInfoControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Tiltle'
                                                onChange={onChange}
                                                placeholder='e.g. mathe,atique'
                                                error={Boolean(classInfoErrors.title)}
                                                aria-describedby='stepper-linear-account-username'
                                            />
                                        )}
                                    />
                                    {classInfoErrors.title && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={Boolean(classInfoErrors.categories)}
                                        htmlFor='stepper-linear-personal-language'
                                        id='stepper-linear-personal-language-label'
                                    >
                                        Categories
                                    </InputLabel>
                                    <Controller
                                        name='categories'
                                        control={classInfoControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                multiple
                                                onChange={onChange}
                                                id='stepper-class-categories'
                                                value={Array.isArray(value) ? value : []}
                                                error={Boolean(classInfoErrors.categories)}
                                                labelId='stepper-linear-personal-language-label'
                                                input={<OutlinedInput label='Language' id='stepper-linear-select-multiple-language' />}
                                            >
                                                <MenuItem value='Math'>Math</MenuItem>
                                                <MenuItem value='Physic'>Physic</MenuItem>
                                                <MenuItem value='Art'>Art</MenuItem>
                                                <MenuItem value='Graphic Design'>Graphic Design</MenuItem>
                                                <MenuItem value='Langues'>Langues</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {classInfoErrors.categories && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-language-helper'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='description'
                                        control={classInfoControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Description'
                                                onChange={onChange}
                                                placeholder='e.g. this course is about'
                                                error={Boolean(classInfoErrors.description)}
                                                aria-describedby='stepper-linear-account-username'
                                                rows={4}
                                                multiline
                                            />
                                        )}
                                    />
                                    {classInfoErrors.description && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={Boolean(classInfoErrors.categories)}
                                        htmlFor='stepper-linear-personal-language'
                                        id='stepper-linear-personal-language-label'
                                    >
                                        Class level
                                    </InputLabel>
                                    <Controller
                                        name='class-level'
                                        control={classInfoControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                multiple
                                                onChange={onChange}
                                                id='stepper-class-categories'
                                                value={Array.isArray(value) ? value : []}
                                                error={Boolean(classInfoErrors['class-level'])}
                                                labelId='stepper-linear-personal-language-label'
                                                input={<OutlinedInput label='Class level' id='stepper-linear-select-multiple-language' />}
                                            >
                                                <MenuItem value='0'>Beginner</MenuItem>
                                                <MenuItem value='1'>Intermediate</MenuItem>
                                                <MenuItem value='2'>Advanced</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    <FormHelperText sx={{ color: 'main' }} id='stepper-linear-personal-language-helper'>
                                        you can choose multiple choice
                                    </FormHelperText>
                                    {classInfoErrors['class-level'] && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-language-helper'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={Boolean(classInfoErrors.categories)}
                                        htmlFor='stepper-linear-personal-language'
                                        id='stepper-linear-personal-language-label'
                                    >
                                        Class level
                                    </InputLabel>
                                    <Controller
                                        name='class-level'
                                        control={classInfoControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                multiple
                                                onChange={onChange}
                                                id='stepper-class-categories'
                                                value={Array.isArray(value) ? value : []}
                                                error={Boolean(classInfoErrors['class-level'])}
                                                labelId='stepper-linear-personal-language-label'
                                                input={<OutlinedInput label='Class level' id='stepper-linear-select-multiple-language' />}
                                            >
                                                <MenuItem value='0'>Beginner</MenuItem>
                                                <MenuItem value='1'>Intermediate</MenuItem>
                                                <MenuItem value='2'>Advanced</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    <FormHelperText sx={{ color: 'main' }} id='stepper-linear-personal-language-helper'>
                                        you can choose multiple choice
                                    </FormHelperText>
                                    {classInfoErrors['class-level'] && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-language-helper'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size='large' variant='outlined' color='secondary' disabled>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 1:
                return (
                    <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {steps[1].title}
                                </Typography>
                                <Typography variant='caption' component='p'>
                                    {steps[1].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='first-name'
                                        control={personalControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='First Name'
                                                onChange={onChange}
                                                placeholder='Leonard'
                                                error={Boolean(personalErrors['first-name'])}
                                                aria-describedby='stepper-linear-personal-first-name'
                                            />
                                        )}
                                    />
                                    {personalErrors['first-name'] && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='last-name'
                                        control={personalControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Last Name'
                                                onChange={onChange}
                                                placeholder='Carter'
                                                error={Boolean(personalErrors['last-name'])}
                                                aria-describedby='stepper-linear-personal-last-name'
                                            />
                                        )}
                                    />
                                    {personalErrors['last-name'] && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id='stepper-linear-personal-country'
                                        error={Boolean(personalErrors.country)}
                                        htmlFor='stepper-linear-personal-country'
                                    >
                                        Country
                                    </InputLabel>
                                    <Controller
                                        name='country'
                                        control={personalControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={value}
                                                label='Country'
                                                onChange={onChange}
                                                error={Boolean(personalErrors.country)}
                                                labelId='stepper-linear-personal-country'
                                                aria-describedby='stepper-linear-personal-country-helper'
                                            >
                                                <MenuItem value='UK'>UK</MenuItem>
                                                <MenuItem value='USA'>USA</MenuItem>
                                                <MenuItem value='Australia'>Australia</MenuItem>
                                                <MenuItem value='Germany'>Germany</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {personalErrors.country && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-country-helper'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={Boolean(personalErrors.language)}
                                        htmlFor='stepper-linear-personal-language'
                                        id='stepper-linear-personal-language-label'
                                    >
                                        Language
                                    </InputLabel>
                                    <Controller
                                        name='language'
                                        control={personalControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                multiple
                                                onChange={onChange}
                                                id='stepper-linear-personal-language'
                                                value={Array.isArray(value) ? value : []}
                                                error={Boolean(personalErrors.language)}
                                                labelId='stepper-linear-personal-language-label'
                                                input={<OutlinedInput label='Language' id='stepper-linear-select-multiple-language' />}
                                            >
                                                <MenuItem value='English'>English</MenuItem>
                                                <MenuItem value='French'>French</MenuItem>
                                                <MenuItem value='Spanish'>Spanish</MenuItem>
                                                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                                                <MenuItem value='Italian'>Italian</MenuItem>
                                                <MenuItem value='German'>German</MenuItem>
                                                <MenuItem value='Arabic'>Arabic</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {personalErrors.language && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-language-helper'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 2:
                return (
                    <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {steps[2].title}
                                </Typography>
                                <Typography variant='caption' component='p'>
                                    {steps[2].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='twitter'
                                        control={socialControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Twitter'
                                                onChange={onChange}
                                                error={Boolean(socialErrors.twitter)}
                                                placeholder='https://twitter.com/carterLeonard'
                                                aria-describedby='stepper-linear-social-twitter'
                                            />
                                        )}
                                    />
                                    {socialErrors.twitter && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-twitter'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='facebook'
                                        control={socialControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Facebook'
                                                onChange={onChange}
                                                error={Boolean(socialErrors.facebook)}
                                                placeholder='https://facebook.com/carterLeonard'
                                                aria-describedby='stepper-linear-social-facebook'
                                            />
                                        )}
                                    />
                                    {socialErrors.facebook && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-facebook'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='google'
                                        control={socialControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Google+'
                                                onChange={onChange}
                                                error={Boolean(socialErrors.google)}
                                                aria-describedby='stepper-linear-social-google'
                                                placeholder='https://plus.google.com/carterLeonard'
                                            />
                                        )}
                                    />
                                    {socialErrors.google && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-google'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='linkedIn'
                                        control={socialControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='LinkedIn'
                                                onChange={onChange}
                                                error={Boolean(socialErrors.linkedIn)}
                                                placeholder='https://linkedin.com/carterLeonard'
                                                aria-describedby='stepper-linear-social-linkedIn'
                                            />
                                        )}
                                    />
                                    {socialErrors.linkedIn && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-linkedIn'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            default:
                return null
        }
    }

    const renderContent = () => {
        if (activeStep === steps.length) {
            return (
                <Fragment>
                    <Typography>All steps are completed!</Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size='large' variant='contained' onClick={handleReset}>
                            Reset
                        </Button>
                    </Box>
                </Fragment>
            )
        } else {
            return getStepContent(activeStep)
        }
    }

    return (
        <Card>
            <CardContent>
                <StepperWrapper>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const labelProps: {
                                error?: boolean
                            } = {}
                            if (index === activeStep) {
                                labelProps.error = false
                                if (
                                    (classInfoErrors.email ||
                                        classInfoErrors.username ||
                                        classInfoErrors.password ||
                                        classInfoErrors['confirm-password']) &&
                                    activeStep === 0
                                ) {
                                    labelProps.error = true
                                } else if (
                                    (personalErrors.country ||
                                        personalErrors.language ||
                                        personalErrors['last-name'] ||
                                        personalErrors['first-name']) &&
                                    activeStep === 1
                                ) {
                                    labelProps.error = true
                                } else if (
                                    (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                                    activeStep === 2
                                ) {
                                    labelProps.error = true
                                } else {
                                    labelProps.error = false
                                }
                            }

                            return (
                                <Step key={index}>
                                    <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                                        <div className='step-label'>
                                            <Typography className='step-number'>0{index + 1}</Typography>
                                            <div>
                                                <Typography className='step-title'>{step.title}</Typography>
                                                <Typography className='step-subtitle'>{step.subtitle}</Typography>
                                            </div>
                                        </div>
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                </StepperWrapper>
            </CardContent>

            <Divider sx={{ m: 0 }} />

            <CardContent>{renderContent()}</CardContent>
        </Card>
    )
}

export default StepperClassForm
