import * as React from 'react'
import { buildUserName } from '~/utils'

export default function Thread() {
  const [commentValue, setCommentValue] = React.useState('')

  React.useEffect(() => {
    const hasEnteredNoName = localStorage.getItem('name') === null
    if (hasEnteredNoName) {
      const { name } = buildUserName()
      localStorage.setItem('name', name)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

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
          value={commentValue}
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
          <h1 style={{ fontSize: 25 }}>Max</h1>
          <p style={{ fontSize: 15 }}>This is fun!</p>
        </li>
      </ul>
    </main>
  )
}
