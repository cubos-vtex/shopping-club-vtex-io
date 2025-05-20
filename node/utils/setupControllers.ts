import {
  AppSettingsController,
  ClubUserController,
  SessionTransformerController,
} from '../controllers'

export async function setupControllers(ctx: Context, next?: NextFn) {
  ctx.state = {
    ...ctx.state,
    appSettingsController: new AppSettingsController(ctx),
    sessionTransformerController: new SessionTransformerController(ctx),
    clubUserController: new ClubUserController(ctx),
  }

  await next?.()
}
