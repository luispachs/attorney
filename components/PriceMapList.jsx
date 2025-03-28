
import { observer } from 'mobx-react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Grid
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'


const PriceMapList = observer(({ prices, type, onDelete }) => {



  const filteredPrices = prices.filter(price => {
     
    switch (type) {
      case 'court':
        return price.court
      case 'county':
        return price.county
      case 'violation':
        return price.violation
      default:
        return false
    }
  })

  if (filteredPrices.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="textSecondary" align="center">
          No prices defined for this category
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper>
      <List>
        {filteredPrices.map((price) => (
          <ListItem key={price.id}>
            <Grid item>
                {price.county?.name?<Typography>{"Name: "+price.county?.name}</Typography>:""}
                {price.county?.stateShortName?<Typography>{"Short Name: "+price.county.stateShortName}</Typography>:""}
                {price.violation?.name?<Typography>{"Violation: "+price.violation.name}</Typography>:""}
                {price.court?.address?<Typography>{"Address: "+price.court?.address}</Typography>:""}
                <Typography>{"Price: "+price.price}</Typography>
                <Typography>{`Points: Min ${price.pointsRange?.min??""} - Max  ${price.pointsRange?.max??""}`}</Typography>

                
            </Grid>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => onDelete(price.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
})

export default PriceMapList 