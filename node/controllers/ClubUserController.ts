import { NotFoundError, UserInputError } from '@vtex/api'

import { BaseController } from './base/BaseController'

const USER_REQUIRED_FIELDS = ['code', 'name', 'email']

export class ClubUserController extends BaseController {
  private readonly clubUser = this.ctx.clients.clubUser

  public async getByEmail() {
    const { email } = this.getQueryStringParams(['email'] as const)

    if (!email) {
      throw new UserInputError('Query string email is required')
    }

    const user = await this.clubUser.getByEmail(email)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  public async create() {
    const fields = await this.getBodyFields<User>(USER_REQUIRED_FIELDS)

    return this.clubUser.create(fields)
  }
}
