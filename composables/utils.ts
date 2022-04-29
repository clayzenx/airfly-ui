export const random = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min);

export const randomIndex = <T>(list: Array<T>): number => Math.floor(Math.random() * list.length);

export const spliceRandomItem = <T>(list: Array<T>): [T, T[]] => {
  const newPlayer = list.splice(randomIndex(list), 1, null)[0];
  list = list.filter(Boolean);
  return [newPlayer, list]
}

