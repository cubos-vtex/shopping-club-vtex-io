import { BaseController } from './base/BaseController'

const CLUB_USER_ITEMS = ['public.isClubUser', 'profile.email']

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

    const isClubUserValue =
      sessionData.namespaces.public?.isClubUser?.value ?? 'false'

    const isClubUser = JSON.parse(isClubUserValue) as boolean
    const profileEmail = sessionData.namespaces.profile?.email?.value

    if (!isClubUser && profileEmail) {
      const clubUser = await this.clubUser
        .getByEmail(profileEmail)
        .catch(() => null)

      if (clubUser) {
        this.ctx.clients.session.updateSession(
          'isClubUser',
          'true',
          CLUB_USER_ITEMS,
          sessionToken
        )

        return { isClubUser: true }
      }
    }

    return { isClubUser }
  }
}
