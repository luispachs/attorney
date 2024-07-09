import { createTheme as muiCreateTheme, responsiveFontSizes } from '@mui/material/styles'
import baseOptions from '../themes/base/options'
import lightThemeOptions from '../themes/light/options'
import darkThemeOptions from '../themes/dark/options'
import {THEME_TYPES} from "@/constants";

// We can include overrides & props here as well if needed
// See https://mui.com/material-ui/customization/theming/ for more fields
export const createTheme = (palette) => {
  const baseTheme = muiCreateTheme(
    baseOptions,
    palette === THEME_TYPES.light ? lightThemeOptions : darkThemeOptions
  )

  return responsiveFontSizes(baseTheme)
}
