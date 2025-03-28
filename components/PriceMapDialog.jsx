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
import { useState, useEffect, useContext } from 'react'
import { AttorneyContext } from '@/stores/providers/AttorneyProvider'

const PriceMapDialog = observer(({ open, onClose, onSave, type, store }) => {
  const { reference } = store
  const attorney = useContext(AttorneyContext);
  const [formData, setFormData] = useState({
    price: '',
    pointsRange: { min: '', max: '' },
    court: '',
    county: '',
    violation: '',
    attorney:attorney.id
  })


  const handleChange = (ev,type)=>{
      if(type == "min" || type == "max"){
       setFormData(
        {
          ...formData,
          pointsRange:{
            ...formData.pointsRange,
            [type]:ev.target.value
          }
        }
       )

      }
      else{
        setFormData(  {
          ...formData,[type]:ev.target.value
        })
      }
  }

  const handleSubmit = (ev,type) => {
    onSave({
      ...formData,
      price: Number(formData.price),
      pointsRange: formData.pointsRange.min ? formData.pointsRange : undefined
    })

    setFormData({
      price: '',
      pointsRange: { min: '', max: '' },
      court: '',
      county: '',
      violation: '',
      attorney:attorney.id
    })
  }

  const renderSelect = () => {
    switch (type) {
      case 'court':
        return (
          <FormControl fullWidth>
            <InputLabel>Court</InputLabel>
            <Select value={formData.court} name='court' id='court' onChange={(ev)=>handleChange(ev,'court')}>
              {reference.courts.map(court => (
                <MenuItem key={court._id} value={court._id}>
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
            <Select value={formData.county} name='county' id='county' onChange={(ev)=>handleChange(ev,'county') }>
              {reference.counties.map(county => (
                <MenuItem key={county._id} value={county._id}>
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
            <Select value={formData.violation}  name='violation' id='violation' onChange={(ev)=>handleChange(ev,'violation')}>
              {reference.violations.map(violation => (
                <MenuItem key={violation._id} value={violation._id}>
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
            
            <Box display={"none"}>
              <TextField type='hidden' label="Attorney" id='attorney' name='attorney' value={attorney.id}/>
            </Box>

            <TextField
              label="Min Points"
              type="number"
              value={formData.pointsRange.min}
              onChange={ev=>handleChange(ev,'min')}
              fullWidth
            />
            <TextField
              label="Max Points"
              type="number"
              value={formData.pointsRange.max}
              onChange={ev=>handleChange(ev,'max')}
              fullWidth
            />
          </Box>

          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={ev=>handleChange(ev,'price')}
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
          disabled={!formData.price || (type === 'court' && !formData.court) || 
                   (type === 'county' && !formData.county) || 
                   (type === 'violation' && !formData.violation)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default PriceMapDialog 