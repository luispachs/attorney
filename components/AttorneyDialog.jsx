import { observer } from 'mobx-react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material'
import AttorneyForm from './AttorneyForm'

const AttorneyDialog = observer(({ 
  open, 
  onClose, 
  attorney, 
  onChange, 
  onSubmit, 
  loading,
  title = 'New Attorney'
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <AttorneyForm attorney={attorney} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default AttorneyDialog 