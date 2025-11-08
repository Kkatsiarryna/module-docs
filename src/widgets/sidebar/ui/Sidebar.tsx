import Tabs from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Icon } from '@shared/model/icon/Icon.tsx'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons.ts'
import style from './Sidebar.module.scss'
import { useSidebar } from '@widgets/sidebar/model'
import { Button, Input, Typography } from '@shared/ui'
import { ProtectedContent } from '@shared/model/access'
import type { Category } from '@features/category-management/model'

export const Sidebar = () => {
  const {
    open,
    showInput,
    categoryName,
    error,
    isLoading,
    categories,
    isAddButtonEnabled,
    isAdmin,
    normalizedValue,
    documentsTabIndex,
    handleChange,
    handleAddCategoryClick,
    handleCancelClick,
    handleInputChange,
    handleAddCategory,
  } = useSidebar()

  const tabItems = [
    ...(isAdmin
      ? [
          {
            key: 'admin-tab',
            label: (
              <Box className={style.section_item}>
                <Icon component={ICONS.WIDGETS} size={SIZES_ICON.SMALL} />
                <Typography variant="bodyM" className={style.section_text}>
                  Администрирование
                </Typography>
              </Box>
            ),
            index: 0,
          },
        ]
      : []),
    {
      key: 'document-tab',
      label: (
        <Box className={style.section_item}>
          <Icon component={ICONS.DOCS} size={SIZES_ICON.SMALL} />
          <Typography variant="bodyM" className={style.section_text}>
            Документы
          </Typography>
          <Icon component={ICONS.CHEVRON_RIGHT} size={SIZES_ICON.SMALL} />
        </Box>
      ),
      sx: open ? { pointerEvents: 'none' } : undefined,
      index: documentsTabIndex,
    },
  ]

  const a11yProps = (index: number) => ({
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tab-panel-${index}`,
  })

  return (
    <Box className={style.container}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={normalizedValue}
        onChange={handleChange}
        aria-label="Section"
        sx={{
          '& .MuiTabs-indicator': {
            left: 0,
            right: 'auto',
          },
        }}
      >
        {tabItems.map(tab => {
          const { key, label, index } = tab
          return (
            <MuiTab
              key={key}
              className={style.section}
              label={label}
              sx={tab.sx}
              {...a11yProps(index)}
            />
          )
        })}
      </Tabs>
      {open && (
        <Box className={style.categories_container}>
          <Typography variant="bodyS" className={style.category}>
            Все документы
          </Typography>
          {categories.map((category: Category) => (
            <Typography key={category.id} variant="bodyS" className={style.category}>
              {category.name}
            </Typography>
          ))}

          <ProtectedContent roles={['admin', 'hr']}>
            {showInput ? (
              <Box className={style.add_category_field}>
                <Input
                  label={'Категория'}
                  value={categoryName}
                  onChange={handleInputChange}
                  error={!!error}
                  helperText={error}
                />
                <Button
                  variant="outlined"
                  size="smallestIconButton"
                  className={style.button_icon}
                  onClick={handleCancelClick}
                  title="Отмена"
                >
                  <Icon
                    component={ICONS.BASKET}
                    sx={{
                      fontSize: {
                        xs: SIZES_ICON.SMALL,
                        sm: SIZES_ICON.SMALL,
                        md: SIZES_ICON.MEDIUM,
                        lg: SIZES_ICON.MEDIUM,
                      },
                    }}
                  />
                </Button>
                <Button
                  variant="primary"
                  disabled={!isAddButtonEnabled || isLoading}
                  loading={isLoading}
                  size="smallestIconButton"
                  className={style.button_icon}
                  onClick={handleAddCategory}
                  title="Добавить категорию"
                >
                  <Icon
                    component={ICONS.ADD}
                    sx={{
                      fontSize: {
                        xs: SIZES_ICON.SMALL,
                        sm: SIZES_ICON.SMALL,
                        md: SIZES_ICON.MEDIUM,
                        lg: SIZES_ICON.MEDIUM,
                      },
                    }}
                  />
                </Button>
              </Box>
            ) : (
              <Box className={style.category} onClick={handleAddCategoryClick}>
                <Icon component={ICONS.ADD} size={SIZES_ICON.SMALL} />
                <Typography variant="bodyS" className={style.add_category}>
                  Добавить категорию
                </Typography>
              </Box>
            )}
          </ProtectedContent>
        </Box>
      )}
    </Box>
  )
}
