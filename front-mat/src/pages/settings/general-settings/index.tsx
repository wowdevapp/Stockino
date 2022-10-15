import React from 'react'
//import FormValidationBasic from 'src/views/forms/form-validation/FormValidationBasic'
import GeneralSettingsForm from '../components/GeneralSettingsForm'
import PageHeader from 'src/@core/components/page-header'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function index() {
  return (
    <Grid container spacing={6} className='match-height'>
      <PageHeader
        title={
          <Typography variant='h5'>
            <Link href='https://github.com/react-hook-form/react-hook-form' target='_blank'>
              General Settings
            </Link>
          </Typography>
        }
      />
      <Grid item xs={12}>
        <GeneralSettingsForm />
      </Grid>
    </Grid>
  )
}
