import { useGetDocumentQuery } from '@features/document-management/api/document-api.ts'

export const useDocumentMeta = () => {
  const { data } = useGetDocumentQuery(1)

  const title = data?.data.title
  const authorId = data?.data.user_id
  const firstnameAuthor = data?.data.first_name
  const lastnameAuthor = data?.data.last_name

  const nameAuthor = `${firstnameAuthor} ${lastnameAuthor}`

  return {
    nameAuthor,
    title,
    authorId,
  }
}
