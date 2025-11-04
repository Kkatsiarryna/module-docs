import { Button, ICONS, Typography } from '@shared/ui'
import styles from './DocumentMeta.module.scss'

export const DocumentMeta = () => {
  return (
    <div className={styles.documentMeta}>
      <div className={styles.title}>
        <Typography variant={'heading3'}> Title Document </Typography>
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
        <Typography variant={'heading3'}> Комментарии </Typography>
      </div>
    </div>
  )
}
