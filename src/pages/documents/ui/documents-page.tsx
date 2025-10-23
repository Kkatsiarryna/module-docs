import { Box, StyledEngineProvider } from "@mui/material"
import { DropdownFilter, DropdownFilterUsers, DropdownRole, Input } from "@shared/ui"
import { ICONS, SIZES_ICON } from "@shared/ui/icons/icons"
import { Header } from "@widgets/header"

export const DocumentsPage = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '100px', marginLeft: '10%' }}>
        <div>Documents Page</div>
        <Input label="Поиск" endIcon={<ICONS.SEARCH width={20} height={20} />} />
        <Header></Header> <DropdownRole></DropdownRole>
        <DropdownFilter nameArray={'sortNames'}></DropdownFilter>
        <DropdownFilterUsers size={SIZES_ICON.SMALL}></DropdownFilterUsers>
        <ICONS.CHECK></ICONS.CHECK>
      </Box>
    </StyledEngineProvider>
  )
  
}
