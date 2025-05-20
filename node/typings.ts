import type { RecorderState, ServiceContext } from '@vtex/api'

import type { Clients } from './clients'
import type {
  AppSettingsController,
  ClubUserController,
  SessionTransformerController,
} from './controllers'

declare global {
  type Context = ServiceContext<
    Clients,
    RecorderState & {
      storeUserEmail?: string
      appSettingsController: AppSettingsController
      sessionTransformerController: SessionTransformerController
      clubUserController: ClubUserController
    }
  >

  type NextFn = () => Promise<void>

  type Handler = (ctx: Context, next?: NextFn) => Promise<void>

  type AppSettings = { schemaHash: string }

  type MasterdataInternalFields = {
    id: string
    createdIn: string
    lastInteractionIn: string
  }

  type User = MasterdataInternalFields & {
    code: string
    name: string
    email: string
  }

  type UserList = {
    data: User[] | undefined[]
    pagination: {
      page: number
      pageSize: number
      total: number
    }
  }

  type SessionValue = { value?: string | null }

  type SessionTransformInput = {
    profile?: { email?: SessionValue }
  }

  type SessionTransformOutput = {
    public: {
      isClubUser: SessionValue
    }
  }
}
