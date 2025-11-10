import { type ChangeEvent, type SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useHasRole } from '@shared/model/access'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '@shared/config'
import { useAddCategoryMutation, useGetCategoriesQuery } from '@features/category-management/api'
import type { Category } from '@features/category-management/model'
import { useToast } from '@app/providers/toast'

export const useSidebar = () => {
  const isAdmin = useHasRole(['admin'])
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery()
  const [addCategory, { isLoading: addLoading, reset }] = useAddCategoryMutation()
  const categories: Category[] = categoriesData?.data.categories ?? []

  const getInitialValue = useCallback(() => {
    if (location.pathname === routes.admin) return 0
    if (location.pathname === routes.documents) return isAdmin ? 1 : 0
    return false
  }, [location.pathname, isAdmin])

  //const [value, setValue] = useState(getInitialValue())
  const [value, setValue] = useState<number | false>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const newValue = getInitialValue()
    if (newValue !== null) {
      setValue(newValue)
    }
    setOpen(location.pathname === routes.documents)
  }, [location.pathname, isAdmin, getInitialValue])

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
    reset()
  }

  const handleCancelClick = (): void => {
    setShowInput(false)
    setCategoryName('')
    setError('')
  }

  const validateInput = (value: string): string => {
    if (value.trim().length === 0) return ''
    if (value.length > 255) {
      return 'Максимальная длина 255'
    }
    if (categories.some(category => category.name.toLowerCase() === value.trim().toLowerCase())) {
      return 'Категория с таким именем уже существует'
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

  const handleAddCategory = async () => {
    if (!isAddButtonEnabled || addLoading) return

    const trimmedName = categoryName.trim()
    const validationError = validateInput(trimmedName)
    if (validationError) {
      setError(validationError)
      return
    }
    try {
      await addCategory({ name: trimmedName }).unwrap()
      setShowInput(false)
      setCategoryName('')
      setError('')
      showToast('Категория успешно добавлена', 'success')
    } catch {
      setError('Неизвсетная ошибка')
    }
  }

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
    documentsTabIndex,
    handleChange,
    handleAddCategoryClick,
    handleCancelClick,
    handleInputChange,
    handleAddCategory,
  }
}
