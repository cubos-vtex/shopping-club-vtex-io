export type ApiResponse<T = unknown> = T & {
  code?: string
  message?: string
  response?: { data?: string | Record<string, string> }
}

export type ApiRequestInput = {
  url: string
  method?: string
  query?: Record<string, string>
  headers?: HeadersInit
  body?: Record<string, unknown> | string
}

export type User = {
  id: string
  createdIn: string
  lastInteractionIn: string
  code: string
  name: string
  email: string
}

export type InputUser = Pick<User, 'code' | 'name' | 'email'>

export type CheckSessionClubUser = {
  isClubUser: boolean
}
