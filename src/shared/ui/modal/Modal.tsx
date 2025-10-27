import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import styles from './Modal.module.scss'
import { Icon } from '@shared/model/icon/Icon'
import { Button } from '../button/Button'
import { Typography } from '../typography/Typography'
import { Box } from '@mui/material'
import { ICONS, SIZES_ICON } from '../icons/icons'

interface CustomModalProps {
  icon: React.ComponentType 
  title: string
  context?: string
  isButtons?: boolean
  textButtons?: string[] 
  isClose?: boolean
  open?: boolean 
  onClose?: () => void 
}

export const Modal: React.FC<CustomModalProps> = ({
  icon,
  title,
  context,
  isButtons = true,
  textButtons = [],
  isClose = true,
  open: externalOpen,
  onClose,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(true)

  const open = externalOpen !== undefined ? externalOpen : internalOpen

  const handleClose = () => {
    setInternalOpen(false)
    onClose?.() 
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: styles.module }}
      >
        {isClose && (
          <Button onClick={handleClose} className={styles.button} variant="ghost" maxWidth={36}>
            <Icon component={ICONS.CLOSE} size={SIZES_ICON.MEDIUM} />
          </Button>
        )}
        <Box
          className={styles.iconBox}
        >
          <Icon
            component={icon}
            sx={{
              overflow: 'visible',
              '& svg': {
                width: { xs: '30px', md: '40px' },
                height: { xs: '30px', md: '40px' },
              },
            }}
          />
        </Box>
        <DialogTitle id="alert-dialog-title" classes={{ root: styles.alertDialogTitle }}>
          {title}
        </DialogTitle>
        {context && (
          <DialogContent>
            <Typography variant="bodyM" id="alert-dialog-description">
              {context}
            </Typography>
          </DialogContent>
        )}
        {isButtons && (
          <DialogActions className={styles.buttonsContainer}>
            <Button variant="outlined" onClick={handleClose}>
              {textButtons[0] || 'Отмена'}
            </Button>
            <Button variant="primary" onClick={handleClose} autoFocus>
              {textButtons[1] || 'OK'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  )
}
