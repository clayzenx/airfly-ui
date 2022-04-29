interface Player {
  name: string,
  id: number,
  avatar: string,
  description: string,
  status?: 'connected' | 'disconnected',
  isBanned?: boolean
}
