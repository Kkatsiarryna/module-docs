import { type ChangeEvent, type SyntheticEvent, useState } from 'react'
import { useHasRole } from '@shared/model/access'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '@shared/config'
import { useAddCategoryMutation, useGetCategoriesQuery } from '@features/category-management/api'

export const useSidebar = () => {
  const isAdmin = useHasRole(['admin'])

  const navigate = useNavigate()
  const location = useLocation()

  const getInitialValue = () => {
    if (location.pathname === routes.admin) return 0
    if (location.pathname === routes.documents) return isAdmin ? 1 : 0
    return isAdmin ? 1 : 0
  }

  const initialValue = getInitialValue()

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery()
  const [addCategory, { isLoading: addLoading }] = useAddCategoryMutation()

  const categories = categoriesData?.data.categories || []

  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState<boolean>(location.pathname === routes.documents)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [error, setError] = useState<string>('')
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  //const [categories, setCategories] = useState<string[]>(initialCategories)

  const normalizedValue = isAdmin ? value : 0
  const documentsTabIndex = isAdmin ? 1 : 0

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)

    if (isAdmin) {
      if (newValue === 0) {
        navigate(routes.admin)
        setOpen(false)
      } else if (newValue === 1) {
        navigate(routes.documents)
        setOpen(true)
      }
    } else {
      navigate(routes.documents)
      setOpen(true)
    }
  }

  // const handleTabClick = (event: MouseEvent): void => {
  //   //setOpen(!open)
  //   event.stopPropagation()
  //
  //   if (location.pathname === routes.documents) {
  //     setOpen(!open)
  //   }
  // }

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCategoryName(value)

    const validationError = validateInput(value)
    setError(validationError)
  }

  const isAddButtonEnabled = categoryName.trim() !== '' && error === ''

  const handleAddCategory = async (): Promise<void> => {
    await addCategory({ name: '1223' })
    // if (!isAddButtonEnabled) return
    //
    // setIsLoading(true)
    //
    // try {
    //   // Здесь нужен API вызов
    //   const response = await addCategoryAPI(categoryName.trim())
    //
    //   if (response.success) {
    //     const newCategory = categoryName.trim()
    //     setCategories(prevCategories => [...prevCategories, newCategory])
    //     setShowInput(false)
    //     setCategoryName('')
    //     setError('')
    //   } else {
    //     setError('Неизвестная ошибка')
    //   }
    // } catch {
    //   setError('Неизвестная ошибка')
    // } finally {
    //   setIsLoading(false)
    // }
  }

  // // Заглушка для вызова API
  // const addCategoryAPI = async (categoryName: string): Promise<{ success: boolean }> => {
  //   console.log(`Добавляем категорию: ${categoryName}`)
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve({ success: true })
  //     }, 1000)
  //   })
  // }

  return {
    value,
    open,
    showInput,
    categoryName,
    error,
    isLoading: addLoading || categoriesLoading,
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
  }
}
