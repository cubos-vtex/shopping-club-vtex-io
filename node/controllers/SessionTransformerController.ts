import { BaseController } from './base/BaseController'

const CLUB_USER_ITEMS = ['public.isClubUser']

export class SessionTransformerController extends BaseController {
  private readonly clubUser = this.ctx.clients.clubUser

  public async getResponse() {
    const body = await this.getBodyFields<SessionTransformInput>(['profile'])
    const email = body.profile?.email?.value
    const response: SessionTransformOutput = {
      public: { isClubUser: { value: 'false' } },
    }

    if (!email) {
      return response
    }

    const clubUser = await this.clubUser.getByEmail(email).catch(() => null)

    if (!clubUser) {
      return response
    }

    response.public.isClubUser.value = 'true'

    return response
  }

  public async checkSessionClubUser() {
    const { storeUserAuthToken, sessionToken } = this.ctx.vtex

    if (!storeUserAuthToken || !sessionToken) {
      return { isClubUser: false }
    }

    const { sessionData } = await this.ctx.clients.session.getSession(
      sessionToken,
      CLUB_USER_ITEMS
    )

    const isClubUser = JSON.parse(
      sessionData.namespaces.public?.isClubUser?.value
    ) as boolean

    return { isClubUser }
  }
}
