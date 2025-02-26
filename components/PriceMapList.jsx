import { observer } from 'mobx-react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const PriceMapList = observer(({ prices, type, onDelete }) => {
  const filteredPrices = prices.filter(price => {
    switch (type) {
      case 'court':
        return price.courtId
      case 'county':
        return price.countyId
      case 'violation':
        return price.violationId
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
            <ListItemText
              primary={`$${price.price}`}
              secondary={price.displayRange}
            />
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