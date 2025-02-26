import { observer } from 'mobx-react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material'
import { useState, useEffect } from 'react'

const PriceMapDialog = observer(({ open, onClose, onSave, type, store }) => {
  const { reference } = store
  const [formData, setFormData] = useState({
    price: '',
    pointsRange: { min: '', max: '' },
    courtId: '',
    countyId: '',
    violationId: ''
  })

  useEffect(() => {
    if (open) {
      setFormData({
        price: '',
        pointsRange: { min: '', max: '' },
        courtId: '',
        countyId: '',
        violationId: ''
      })
    }
  }, [open])

  const handleChange = (field) => (event) => {
    if (field === 'min' || field === 'max') {
      setFormData({
        ...formData,
        pointsRange: { ...formData.pointsRange, [field]: Number(event.target.value) }
      })
    } else {
      setFormData({ ...formData, [field]: event.target.value })
    }
  }

  const handleSubmit = () => {
    onSave({
      ...formData,
      price: Number(formData.price),
      pointsRange: formData.pointsRange.min ? formData.pointsRange : undefined
    })
  }

  const renderSelect = () => {
    switch (type) {
      case 'court':
        return (
          <FormControl fullWidth>
            <InputLabel>Court</InputLabel>
            <Select value={formData.courtId} onChange={handleChange('courtId')}>
              {reference.courts.map(court => (
                <MenuItem key={court.id} value={court.id}>
                  {court.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )

      case 'county':
        return (
          <FormControl fullWidth>
            <InputLabel>County</InputLabel>
            <Select value={formData.countyId} onChange={handleChange('countyId')}>
              {reference.counties.map(county => (
                <MenuItem key={county.id} value={county.id}>
                  {county.name}, {county.state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )

      case 'violation':
        return (
          <FormControl fullWidth>
            <InputLabel>Violation</InputLabel>
            <Select value={formData.violationId} onChange={handleChange('violationId')}>
              {reference.violations.map(violation => (
                <MenuItem key={violation.id} value={violation.id}>
                  {violation.code} - {violation.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Price Entry</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {renderSelect()}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Min Points"
              type="number"
              value={formData.pointsRange.min}
              onChange={handleChange('min')}
              fullWidth
            />
            <TextField
              label="Max Points"
              type="number"
              value={formData.pointsRange.max}
              onChange={handleChange('max')}
              fullWidth
            />
          </Box>

          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.price || (type === 'court' && !formData.courtId) || 
                   (type === 'county' && !formData.countyId) || 
                   (type === 'violation' && !formData.violationId)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default PriceMapDialog 