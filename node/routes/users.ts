import { method } from '@vtex/api'

import { createHandlers } from '../utils'

async function getByEmail(ctx: Context) {
  ctx.body = await ctx.state.clubUserController.getByEmail()
}

async function createUser(ctx: Context) {
  ctx.body = await ctx.state.clubUserController.create()
}

export default method({
  GET: createHandlers([getByEmail]),
  POST: createHandlers([createUser]),
})
