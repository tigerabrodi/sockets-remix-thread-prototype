import * as React from 'react'
import { useNavigate } from 'remix'

export default function Enter() {
  const [name, setName] = React.useState('')
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    localStorage.setItem('name', name)
    navigate('/thread')
  }

  return (
    <main style={{ height: '100%' }}>
      <h1 style={{ marginTop: 140, fontSize: 40 }}>Enter Thread</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="name" style={{ marginTop: 100, fontSize: 20 }}>
          Your name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Max"
          value={name}
          onChange={handleChange}
          style={{
            width: 300,
            height: 28,
            fontSize: 15,
            paddingLeft: 5,
            marginTop: 25,
          }}
        />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            width: 60,
            height: 30,
            border: 'none',
            boxShadow: '0 0 3px rgba(0, 0, 0, 0.4)',
            marginTop: 30,
            cursor: 'pointer',
          }}
          type="submit"
        >
          Join
        </button>
      </form>
    </main>
  )
}
