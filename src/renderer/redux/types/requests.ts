export type Request = {
  id: string,
  name: string,
  queue: string,
  message: string,
}

export type RequestStore = {
  items: Request[],
  selected: Request | null
}