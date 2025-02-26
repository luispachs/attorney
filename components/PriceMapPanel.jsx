import { observer } from 'mobx-react'
import { Box, Typography, Button, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import PriceMapList from './PriceMapList'
import PriceMapDialog from './PriceMapDialog'

const PriceMapPanel = observer(({ attorneyId, store }) => {
  const [tabValue, setTabValue] = useState('court')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { attorneyPrice } = store

  const prices = attorneyPrice.getPriceMapForAttorney(attorneyId)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleSavePrice = async (data) => {
    try {
      await attorneyPrice.createPrice({
        ...data,
        attorneyId
      })
      handleCloseDialog()
    } catch (error) {
      console.error('Failed to save price:', error)
    }
  }

  const handleDeletePrice = async (priceId) => {
    try {
      await attorneyPrice.deletePrice(priceId)
    } catch (error) {
      console.error('Failed to delete price:', error)
    }
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Price Map</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add Price
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Courts" value="court" />
        <Tab label="Counties" value="county" />
        <Tab label="Violations" value="violation" />
      </Tabs>

      <PriceMapList
        prices={prices}
        type={tabValue}
        onDelete={handleDeletePrice}
      />

      <PriceMapDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSavePrice}
        type={tabValue}
        store={store}
      />
    </Box>
  )
})

export default PriceMapPanel 