import { StyledEngineProvider } from '@mui/material/styles'
// import theme from '../shared/ui/button/ButtonTheme'
import { Button } from '../shared/ui'
import Check from '../shared/assets/icons/outlined/check.svg?react'
import Plus from '../shared/assets/icons/outlined/plus.svg?react'
// import Close from '../shared/assets/icons/outlined/close.svg?react'
import Trash from '../shared/assets/icons/outlined/delete.svg?react'

function App() {
let isLoading: boolean | undefined;
  function handleSomeAction(): void {
    isLoading = !isLoading
  }

  return (
    <StyledEngineProvider injectFirst>
      {/* <ThemeProvider theme={theme}> */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '10%' }}>
        Hello World! // 1. Простая кнопка (как раньше button-for-header)
        <h3>Базовые кнопки</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          {/* Основная (синяя) кнопка */}
          <Button variant="primary" size="medium" onClick={() => alert('Клик!')}>
            Отправить
          </Button>

          {/* Вторичная (фиолетовая) кнопка */}
          <Button variant="secondary" size="small" onClick={() => alert('Клик!')}>
            Сохранить черновик
          </Button>

          {/* Кнопка с обводкой */}
          <Button variant="outlined" size="medium" onClick={() => alert('Клик!')}>
            Отмена
          </Button>

          {/* Прозрачная (ghost) кнопка */}
          <Button variant="ghost" size="small" onClick={() => alert('Клик!')}>
            Подробнее
          </Button>
        </div>
        <h3>Кнопки с иконками</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          {/* Иконка в начале */}
          <Button variant="primary" size="small" startIcon={<Plus />} >
            Добавить документ
          </Button>

          {/* Иконка в конце */}
          <Button variant="secondary" size="medium" endIcon={<Check />}>
            Ознакомлен
          </Button>
        </div>
        <h3>Кнопки-иконки</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          {/* Кнопка-иконка с обводкой (корзина) */}
          <Button
            variant="outlined"
            size="small"
            isIconOnly
            aria-label="Удалить" // Важно для доступности!
          >
            <Trash />
          </Button>

          {/* Основная кнопка-иконка (добавить) */}
          <Button variant="primary" size="medium" isIconOnly aria-label="Добавить">
            <Plus />
          </Button>
        </div>
        <h3>Состояния кнопок</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          {/* Отключенная кнопка */}
          <Button variant="primary" size="medium" disabled>
            Отправка...
          </Button>

          {/* Кнопка в состоянии загрузки */}
          <Button
            variant="primary"
            size="medium"
            isLoading={true} // Включаем состояние загрузки
            startIcon={<Plus />} // Иконка будет скрыта
          >
            Добавление
          </Button>

          {/* Кнопка-иконка в состоянии загрузки */}
          <Button variant="outlined" size="small" isIconOnly isLoading={true}>
            <Trash />
          </Button>
        </div>
        <h3>Пример формы</h3>
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>Нажмите "Войти", чтобы симулировать запрос на сервер.</p>

          <Button
            type="submit" // Можно передавать любые атрибуты для <button>
            variant="primary"
            size="medium"
            isLoading={isLoading} // Управляется состоянием isLoading
            onClick={handleSomeAction} // Наш обработчик, который меняет состояние
          >
            Войти в аккаунт
          </Button>
        </div>
      </div>
      {/* </ThemeProvider> */}
    </StyledEngineProvider>
  )
}

export default App
