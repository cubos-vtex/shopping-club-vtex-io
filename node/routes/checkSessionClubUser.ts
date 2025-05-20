import { method } from '@vtex/api'

import { createHandlers } from '../utils'

async function checkSessionClubUser(ctx: Context) {
  ctx.body = await ctx.state.sessionTransformerController.checkSessionClubUser()
}

export default method({
  GET: createHandlers([checkSessionClubUser]),
})
