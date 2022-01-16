import io from 'socket.io-client'

export function connect() {
  if (!window.ENV.CONNECTION_URL) {
    throw 'error: no port'
  }

  return io(window.ENV.CONNECTION_URL)
}
