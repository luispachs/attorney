import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Typography, Button, CircularProgress, Grid, Tooltip, Stack } from '@mui/material'
import AttorneyList from '@/components/AttorneyList'
import AttorneyDialog from '@/components/AttorneyDialog'
import PriceMapPanel from '@/components/PriceMapPanel'
import Link from 'next/link'
import FlagIcon from '@mui/icons-material/Flag';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

@inject('store')
@observer
class AttorneysPanelPage extends Component {
  state = {
    dialogOpen: false,
    currentAttorney: null,
    formData: {
      name: '',
      email: '',
      phone: '',
      address: '',
      isActive: true
    },
    selectedAttorneyId: null
  }

  componentDidMount() {
    this.props.store.attorney.fetchAttorneys()
  }

  handleOpenDialog = (attorney = null) => {
    this.setState({
      dialogOpen: true,
      currentAttorney: attorney,
      formData: attorney || {
        name: '',
        email: '',
        phone: '',
        address: '',
        isActive: true
      }
    })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      currentAttorney: null,
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        isActive: true
      }
    })
  }

  handleFormChange = (data) => {
    this.setState({ formData: data })
  }

  handleSubmit = async () => {
    const { attorney } = this.props.store
    const { currentAttorney, formData } = this.state

    try {
      if (currentAttorney) {
        await attorney.updateAttorney(currentAttorney.id, formData)
      } else {
        await attorney.createAttorney(formData)
      }
      this.handleCloseDialog()
    } catch (error) {
      console.error('Failed to save attorney:', error)
    }
  }

  handleToggle = async (attorney) => {
    try {
      await this.props.store.attorney.disableAttorney(attorney.id)
    } catch (error) {
      console.error('Failed to toggle attorney status:', error)
    }
  }

  handleSelectAttorney = (attorneyId) => {
    this.setState({ selectedAttorneyId: attorneyId })
    if (attorneyId) {
      this.props.store.attorneyPrice.fetchPriceMap(attorneyId)
    }
  }

  

  render() {
    const { attorney } = this.props.store
    const { items: attorneys, loading, error } = attorney
    const { dialogOpen, formData, currentAttorney, selectedAttorneyId } = this.state

    if (loading && !dialogOpen) {
      return (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )
    }

    if (error && !dialogOpen) {
      return (
        <Box p={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )
    }

    return (
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={selectedAttorneyId ? 6 : 12}>
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Typography variant="h4">Attorneys</Typography>
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleOpenDialog()}>
                  Add Attorney
                </Button>

                <Tooltip title="Add Court">
                  <Link href={"/courts-panel"}>
                    <AccountBalanceIcon/>
                  </Link>
                </Tooltip>

                <Tooltip title="Add County">
                  <Link href={"/county-panel"}>
                    <FlagIcon/>
                  </Link>
                </Tooltip>
                <Tooltip title="Add Violations">
                  <Link href={"/violations-panel"}>
                    <CrisisAlertIcon/>
                  </Link>
                </Tooltip>
              </Stack>

            </Box>
            <AttorneyList 
              attorneys={attorneys} 
              onEdit={this.handleOpenDialog}
              onToggle={this.handleToggle}
              onSelect={this.handleSelectAttorney}
              selectedId={selectedAttorneyId}
            />
          </Grid>

          {selectedAttorneyId && (
            <Grid item xs={12} md={6}>
              <PriceMapPanel 
                attorneyId={selectedAttorneyId}
                store={this.props.store}
              />
            </Grid>
          )}
        </Grid>

        <AttorneyDialog
          open={dialogOpen}
          onClose={this.handleCloseDialog}
          attorney={formData}
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
          loading={loading}
          title={currentAttorney ? 'Edit Attorney' : 'New Attorney'}
        />
      </Box>
    )
  }
}

export default AttorneysPanelPage
