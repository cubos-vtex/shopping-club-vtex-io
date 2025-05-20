import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class ClubUser extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://bravtextoolstore.myvtex.com/_v/shopping-club-users`,
      context,
      options
    )
  }

  public async create(user: User) {
    return this.http.post<User>('/users', user, {
      metric: 'create-user',
    })
  }

  public async getByEmail(email: string) {
    const searchByEmail = await this.http.get<UserList>('/users', {
      params: { email },
      metric: 'get-user-by-email',
    })

    const [user] = searchByEmail.data

    return user
  }
}
