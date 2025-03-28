import { observer } from 'mobx-react'
import { Box, Typography, Button, Tabs, Tab } from '@mui/material'
import { useContext, useState } from 'react'
import PriceMapList from './PriceMapList'
import PriceMapDialog from './PriceMapDialog'
import { AttorneyContext } from '@/stores/providers/AttorneyProvider'

const PriceMapPanel = observer(({ attorney, store }) => {
  const [tabValue, setTabValue] = useState('court')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { attorneyPrice } = store

  const prices = attorneyPrice.getPriceMapForAttorney(attorney.id)

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
      let attorneyId = attorney._id;
  
      let res = await attorneyPrice.createPrice({
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
      <AttorneyContext.Provider value={attorney}>
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
      </AttorneyContext.Provider>

    </Box>
  )
})

export default PriceMapPanel 