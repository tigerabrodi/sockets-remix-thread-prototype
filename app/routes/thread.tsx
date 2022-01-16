import * as React from 'react'
import { v4 } from 'uuid'
import { Comment } from '~/components/Comment'
import { CommentType, storageKeys } from '~/types'
import { buildUserName } from '~/utils'
import { wsContext } from '~/ws-context'

export default function Thread() {
  const [commentText, setCommentText] = React.useState('')
  const [comments, setComments] = React.useState<CommentType[]>([])
  const socket = React.useContext(wsContext)

  React.useEffect(() => {
    const hasEnteredNoName = localStorage.getItem('name') === null
    if (hasEnteredNoName) {
      const { name } = buildUserName()
      localStorage.setItem(storageKeys.authorName, name)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newComment: CommentType = {
      id: v4(),
      text: commentText,
      authorName: localStorage.getItem(storageKeys.authorName) as string,
      date: new Date().toISOString(),
    }

    socket!.emit('send-client-comment', newComment)
    setCommentText('')
  }

  React.useEffect(() => {
    if (!socket) return

    socket.on('send-server-comment', (newComments) => {
      setComments(newComments)
    })
  }, [socket])

  return (
    <main style={{ minHeight: '100%', paddingBottom: 20 }}>
      <h1 style={{ marginTop: 60, fontSize: 100 }}>Thread</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 50,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          columnGap: 10,
        }}
      >
        <label htmlFor="comment" className="sr-only">
          Comment
        </label>
        <textarea
          id="comment"
          value={commentText}
          onChange={handleChange}
          style={{ width: 400, height: 100, fontSize: 15, padding: 15 }}
        />
        <button
          type="submit"
          style={{ width: 65, height: 30, cursor: 'pointer', marginTop: 20 }}
        >
          Post
        </button>
      </form>
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          listStyle: 'none',
          width: '100%',
          marginTop: 50,
          rowGap: 20,
        }}
      >
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </ul>
    </main>
  )
}
