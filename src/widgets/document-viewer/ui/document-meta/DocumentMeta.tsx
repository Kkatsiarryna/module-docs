import { Button, ICONS, Typography } from '@shared/ui'
import styles from './DocumentMeta.module.scss'
import IconButton from '@mui/material/IconButton'

type Props = {
  title: string
  onClose?: () => void
}
export const DocumentMeta = ({ onClose, title }: Props) => {
  return (
    <div className={styles.documentMeta}>
      <IconButton className={styles.closeIcon} onClick={onClose}>
        <ICONS.CLOSE />
      </IconButton>
      <div className={styles.title}>
        <Typography variant={'heading3'} className={styles.heading}>
          {title}
        </Typography>
        <div className={styles.addedBy}>
          <span className={styles.label}>Добавил:</span>
          <div className={styles.documentAuthor}>
            <div className={styles.userTag}>FL</div>
            <span className={styles.userName}>Firstname Lastname</span>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.stat}>
            <ICONS.HEARD />
            <span>0</span>
          </div>
          <div className={styles.stat}>
            <ICONS.EYE />
            <span>0</span>
          </div>
          <Button variant={'outlined'}> Ознакомиться</Button>
        </div>
      </div>
      <div className={styles.comments}>
        <Typography variant={'heading3'} className={styles.heading}>
          Комментарии
        </Typography>
      </div>
    </div>
  )
}
