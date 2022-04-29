export const useConnected = () => useState<Player[]>('connected', () => []);
export const useDisconnected = () => useState<Player[]>('disconnected', () => []);
