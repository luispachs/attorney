import { observer } from 'mobx-react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Switch,
  ListItemButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const AttorneyList = observer(({ attorneys, onEdit, onToggle, onSelect, selectedId }) => {

  return (
    <Paper>
      <List>
        {attorneys.map((attorney) => (
          <ListItem 
            key={attorney.id}
            disablePadding
            secondaryAction={
              <>
                <Switch
                  checked={attorney.isActive}
                  onChange={() => onToggle(attorney)}
                />
                <IconButton onClick={() => onEdit(attorney)}>
                  <EditIcon />
                </IconButton>
              </>
            }
          >
            <ListItemButton 
              onClick={() => onSelect(attorney.id)}
              selected={selectedId === attorney.id}
            >
              <ListItemText
                primary={attorney.name}
                secondary={attorney.email}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
})

export default AttorneyList 