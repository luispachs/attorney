
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
            <ListItemText
              primary={
                `
                ${price.county?.name?"Name: "+price.county?.name:""}
                ${price.county?.stateShortName?"Short Name: "+price.county?.stateShortName:""}
                ${price.violation?.name?"Violation: "+price.violation?.name:""} ${price.court?.name?"Name: "+price.court?.name:""}   ${price.court?.address?"Address: "+price.court?.address:""} Valor: $${price.price}`
              }
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