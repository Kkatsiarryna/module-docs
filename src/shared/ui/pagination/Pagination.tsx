import MuiPagination from '@mui/material/Pagination'
import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination'

type Props = MuiPaginationProps

export const Pagination = ({ count, page, onChange, ...rest }: Props) => {
  return <MuiPagination count={count} page={page} onChange={onChange} {...rest} />
}
