import { method } from '@vtex/api'

import { createHandlers } from '../utils'

async function setSessionClubUser(ctx: Context) {
  ctx.body = await ctx.state.sessionTransformerController.getResponse()
}

export default method({
  POST: createHandlers([setSessionClubUser]),
})
