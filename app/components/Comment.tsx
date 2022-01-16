import { CommentType } from '~/types'

type Props = {
  comment: CommentType
}

export const Comment = ({ comment }: Props) => (
  <li
    style={{
      border: '2px solid black',
      backgroundColor: 'lightgray',
      width: 400,
      paddingLeft: 20,
      paddingTop: 5,
      paddingBottom: 4,
      minHeight: 70,
    }}
  >
    <h1 style={{ fontSize: 25 }}>{comment.authorName}</h1>
    <p style={{ fontSize: 15 }}>{comment.text}</p>
  </li>
)
