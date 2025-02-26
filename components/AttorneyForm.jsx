import { observer } from 'mobx-react'
import { Box, TextField } from '@mui/material'

const AttorneyForm = observer(({ attorney, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...attorney, [name]: value })
  }

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={attorney.name || ''}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={attorney.email || ''}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={attorney.phone || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        multiline
        rows={3}
        value={attorney.address || ''}
        onChange={handleChange}
      />
    </Box>
  )
})

export default AttorneyForm 