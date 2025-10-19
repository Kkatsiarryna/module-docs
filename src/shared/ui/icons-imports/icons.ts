import SettingsIcon from '../assets/icons/outlined/settings.svg?react'
import LogOutIcon from '../assets/icons/outlined/log-out.svg?react'
import AddIcon from '../assets/icons/outlined/plus.svg?react'
import WarningIcon from '../assets/icons/filled/warning_circle_red.svg?react'
import SuccessIcon from '../assets/icons/filled/check_circle_green.svg?react'
import AdminIcon from '../assets/icons/outlined/widgets.svg?react'
import DocsIcon from '../assets/icons/outlined/documents.svg?react'
import ChevronRightIcon from '../assets/icons/outlined/chevron_right.svg?react'
import ChevronDownIcon from '../assets/icons/outlined/chevron_down.svg?react'
import PhotoIcon from '../assets/icons/outlined/photo.svg?react'
import WarningOutlineIcon from '../assets/icons/outlined/warning.svg?react'
import ChevronUpIcon from '../assets/icons/outlined/chevron_up.svg?react'
import SearchIcon from '../assets/icons/outlined/search.svg?react'
import CloseIcon from '../assets/icons/outlined/close.svg?react'
import SortStartIcon from '../assets/icons/outlined/sort-a.svg?react'
import SortEndIcon from '../assets/icons/outlined/sort-z.svg?react'
import ArrowsTwoSidesIcon from '../assets/icons/outlined/sort.svg?react'
import ArrowUpIcon from '../assets/icons/outlined/arrow-up.svg?react'
import ArrowDownIcon from '../assets/icons/outlined/arrow-down.svg?react'
import SortAccessIcon from '../assets/icons/outlined/sort-access.svg?react'
import UploadIcon from '../assets/icons/outlined/upload.svg?react'
import BasketIcon from '../assets/icons/outlined/delete.svg?react'
import CheckIcon from '../assets/icons/outlined/check.svg?react'
import EyeIcon from '../assets/icons/outlined/eye.svg?react'
import HeardIcon from '../assets/icons/outlined/like.svg?react'

export const BUTTON_ICONS = {
  ADD: AddIcon,
  CLOSE: CloseIcon,
  CHECK: CheckIcon,
  EYE: EyeIcon,
  HEARD: HeardIcon,
} as const

export const USER_ICONS = {
  SETTINGS: SettingsIcon,
  LOGOUT: LogOutIcon,
  PHOTO: PhotoIcon,
} as const

export const INFO_ICONS = {
  WARNING: WarningIcon,
  SUCCESS: SuccessIcon,
  WARNING_OUTLINE: WarningOutlineIcon,
} as const

export const PAGE_ICONS = {
  ADMIN: AdminIcon,
  DOCS: DocsIcon,
  SEARCH: SearchIcon,
  SORT_START: SortStartIcon,
  SORT_END: SortEndIcon,
  ARROWS_TWO_SIDES: ArrowsTwoSidesIcon,
  ARROW_UP: ArrowUpIcon,
  ARROW_DOWN: ArrowDownIcon,
  SORT_ACCESS: SortAccessIcon,
  UPLOAD: UploadIcon,
  BASKET: BasketIcon,
} as const

export const COMMON_ICONS = {
  CHEVRON_RIGHT: ChevronRightIcon,
  CHEVRON_DOWN: ChevronDownIcon,
  CHEVRON_UP: ChevronUpIcon,
} as const

// Размеры иконок
export const SIZES_ICON = {
  SMALLEST: 10,
  SMALL: 12,
  MEDIUM: 14,
} as const
