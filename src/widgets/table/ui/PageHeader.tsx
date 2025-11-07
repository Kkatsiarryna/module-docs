import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@shared/ui/typography/Typography'
import { InputSearch } from '@shared/ui/input-search/InputSearch'
import { Button } from '@shared/ui/button/Button'
import { Icon } from '@shared/model/icon/Icon'
import { ICONS, SIZES_ICON } from '@shared/ui/icons/icons'

type Props = {
  type: 'users' | 'documents'
  deleteLoading?: boolean
  onAddClick?: () => void
  onDeleteClick?: () => void
}

type Action = {
  label: string
  variant: 'primary' | 'secondary'
  startIcon?: React.ReactNode
  loading?: boolean
  onClick?: () => void
}

export const PageHeader: React.FC<Props> = ({
  type,
  deleteLoading = false,
  onAddClick,
  onDeleteClick,
}) => {
  const headerConfig: { title: string; actions: Action[] } =
    type === 'users'
      ? {
          title: 'Администрирование',
          actions: [
            {
              label: 'Добавить пользователя',
              variant: 'primary' as const,
              startIcon: <Icon component={ICONS.ADD} size={SIZES_ICON.MEDIUM} />,
              loading: false,
            },
          ],
        }
      : {
          title: 'Документы',
          actions: [
            {
              label: 'Добавить документ',
              variant: 'primary' as const,
              startIcon: <Icon component={ICONS.ADD} size={SIZES_ICON.MEDIUM} />,
              loading: false,
              onClick: onAddClick,
            },
            {
              label: 'Удалить документ',
              variant: 'secondary' as const,
              loading: deleteLoading,
              onClick: onDeleteClick,
            },
          ],
        }

  return (
    <Box sx={{ mb: '20px', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Typography
        variant={'heading1'}
        sx={{
          wordBreak: 'break-word',
          overflow: 'hidden',
          fontSize: { sm: '24px' },
        }}
      >
        {headerConfig.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          mt: '20px',
          width: '100%',
          maxWidth: '100%',
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <InputSearch
          sx={{
            flex: '1 1 auto',
            minWidth: 0,
          }}
          placeholder="Поиск"
        />
        <Box
          sx={{
            display: 'flex',
            flex: { xs: '0 1 auto', sm: '0 0 auto' },
            width: { sm: 'fit-content' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {headerConfig.actions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant}
              loading={action.loading ?? false}
              loadingPosition={action.startIcon ? 'start' : undefined}
              isIcon={!!action.startIcon}
              startIcon={action.startIcon}
              onClick={action.onClick}
              sx={{
                flex: { xs: '1 1 auto', sm: '0 0 auto' },
                minWidth: { xs: 0, sm: 'auto' },
                width: 'auto',
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 0.75, sm: 0.875 },
                fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
