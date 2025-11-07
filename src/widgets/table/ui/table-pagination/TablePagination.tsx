import * as React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@shared/ui/button/Button'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons'
import { createRange } from '../../model/utils/pagination'

type Props = {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
}

export const TablePagination: React.FC<Props> = ({ count, page, rowsPerPage, onPageChange }) => {
  const pageCount = Math.max(1, Math.ceil(count / rowsPerPage))

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, page - 1))
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.min(pageCount - 1, page + 1))
  }

  const handlePageNumberClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    targetPage: number
  ) => {
    onPageChange(event, targetPage)
  }

  const baseButtonSx = {
    borderRadius: '12px',
    minWidth: 36,
    height: 36,
    px: 1,
    color: 'var(--text-secondary)',
    '& svg': { fill: 'var(--icon-disabled)' },
    '&:hover': {
      background: 'var(--background-surface-2)',
      color: 'var(--accent-hover)',
      borderColor: 'var(--accent-hover)',
      '& svg': { fill: 'var(--accent-hover)' },
    },
  } as const

  const baseButtonEllipsis = {
    ...baseButtonSx,
    cursor: 'default',
    pointerEvents: 'none',
  } as const

  const buttons: React.ReactNode[] = []

  buttons.push(
    <Button
      key="prev"
      variant="ghost"
      isIcon
      disabled={page <= 0}
      sx={baseButtonSx}
      onClick={handleBackButtonClick}
    >
      <Icon component={ICONS.CHEVRON_LEFT} size={SIZES_ICON.MEDIUM} />
    </Button>
  )

  const MAX_VISIBLE = 5
  const start = Math.max(0, page - 2)
  const end = Math.min(pageCount - 1, start + (MAX_VISIBLE - 1))
  const adjustedStart = Math.max(0, end - (MAX_VISIBLE - 1))
  const visiblePages = createRange(adjustedStart, end)

  if (adjustedStart > 0) {
    buttons.push(
      <Button
        key="first"
        variant="ghost"
        sx={baseButtonSx}
        onClick={e => handlePageNumberClick(e, 0)}
      >
        1
      </Button>
    )
    if (adjustedStart > 1) {
      buttons.push(
        <Button key="ellipsis-left" variant="ghost" sx={baseButtonEllipsis}>
          ...
        </Button>
      )
    }
  }

  visiblePages.forEach((p, idx) => {
    const isActive = p === page
    buttons.push(
      <Button
        key={`page-${p}-${idx}`}
        variant="ghost"
        sx={{
          ...baseButtonSx,
          background: isActive ? 'var(--accent-focused)' : null,
          color: isActive ? 'var(--text-light)' : baseButtonSx.color,
          borderColor: isActive ? 'var(--accent-focused)' : null,
        }}
        onClick={e => handlePageNumberClick(e, p)}
      >
        {p + 1}
      </Button>
    )
  })

  if (end < pageCount - 1) {
    if (end < pageCount - 2) {
      buttons.push(
        <Button key="ellipsis-right" variant="ghost" sx={baseButtonEllipsis}>
          ...
        </Button>
      )
    }
    buttons.push(
      <Button
        key="last"
        variant="ghost"
        sx={baseButtonSx}
        onClick={e => handlePageNumberClick(e, pageCount - 1)}
      >
        {pageCount}
      </Button>
    )
  }

  buttons.push(
    <Button
      key="next"
      variant="ghost"
      isIcon
      disabled={page >= pageCount - 1}
      sx={baseButtonSx}
      onClick={handleNextButtonClick}
    >
      <Icon component={ICONS.CHEVRON_RIGHT} size={SIZES_ICON.MEDIUM} />
    </Button>
  )

  return <Box sx={{ display: 'flex', gap: 1 }}>{buttons}</Box>
}
