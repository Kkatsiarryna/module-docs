import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '../icons/icons'
import { Typography } from '../typography/Typography'
import style from './Tab.module.scss'
import { Input } from '../input/Input'
import { Button } from '../button/Button'

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const initialCategories = ['Benefits', 'ОКР']

export default function Tab() {
  const [value, setValue] = React.useState(1)
  const [open, setOpen] = React.useState<boolean>(true)
  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [categoryName, setCategoryName] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [categories, setCategories] = React.useState<string[]>(initialCategories)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setOpen(false)
  }

  const handleTabClick = (): void => {
    setOpen(!open)
  }

  const handleAddCategoryClick = (): void => {
    setShowInput(true)
    setCategoryName('')
    setError('')
  }

  const handleCancelClick = (): void => {
    setShowInput(false)
    setCategoryName('')
    setError('')
  }

  const validateInput = (value: string): string => {
    if (value.length > 255) {
      return 'Максимальная длина 255'
    }

    return ''
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCategoryName(value)

    const validationError = validateInput(value)
    setError(validationError)
  }

  const isAddButtonEnabled = categoryName.trim() !== '' && error === ''

  const handleAddCategory = async (): Promise<void> => {
    if (!isAddButtonEnabled) return

    setIsLoading(true)

    try {
      // Здесь нужен API вызов
      const response = await addCategoryAPI(categoryName.trim())

      if (response.success) {
        const newCategory = categoryName.trim()
        setCategories(prevCategories => [...prevCategories, newCategory])
        setShowInput(false)
        setCategoryName('')
        setError('')
      } else {
        setError('Неизвестная ошибка')
      }
    } catch {
      setError('Неизвестная ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  // Заглушка для вызова API
  const addCategoryAPI = async (categoryName: string): Promise<{ success: boolean }> => {
    console.log(`Добавляем категорию: ${categoryName}`)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true })
      }, 1000)
    })
  }

  return (
    <Box className={style.container}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Section"
        sx={{
          '& .MuiTabs-indicator': {
            left: 0,
            right: 'auto',
          },
        }}
      >
        <MuiTab
          key="0"
          className={style.section}
          label={
            <Box className={style.section_item}>
              <Icon component={ICONS.WIDGETS} size={SIZES_ICON.SMALL} />
              <Typography variant="bodyM" className={style.section_text}>
                Администрирование
              </Typography>
            </Box>
          }
          {...a11yProps(0)}
        />
        <MuiTab
          key="1"
          className={style.section}
          onClick={handleTabClick}
          sx={open ? { pointerEvents: 'none' } : undefined}
          label={
            <Box className={style.section_item}>
              <Icon component={ICONS.DOCS} size={SIZES_ICON.SMALL} />
              <Typography variant="bodyM" className={style.section_text}>
                Документы
              </Typography>
              <Icon component={ICONS.CHEVRON_RIGHT} size={SIZES_ICON.SMALL} />
            </Box>
          }
          {...a11yProps(1)}
        />
      </Tabs>
      {open && (
        <Box className={style.categories_container}>
          <Typography variant="bodyS" className={style.category}>
            Все документы
          </Typography>
          {categories.map((item, index) => (
            <Typography key={index} variant="bodyS" className={style.category}>
              {item}
            </Typography>
          ))}
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
        </Box>
      )}
    </Box>
  )
}
