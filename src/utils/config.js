/*
 * Gabe Dunn 2019
 * Easily accessible place to import all configuration variables from instead of process.env.KEY for each key.
 */

import { config } from 'dotenv'
import { join } from 'path'

// Run dotenv init function. Populates process.env with variables from .env files.
config()

export const botToken = process.env.BOT_TOKEN // Discord API token for the bot.
export const botOwner = process.env.BOT_OWNER // Discord ID for the bot owner.
export const prefix = process.env.PREFIX || '.' // Prefix for bot commands.
export const msgDeleteTime = process.env.MSG_DELETE_TIME || 20 // Amount of time in seconds to wait before deleting large help messages.
export const dbFile = join(
  __dirname,
  '..',
  '..',
  process.env.DB_FILE || 'devmod.db'
) // Absolute path for the database file.
export const autoBan = process.env.AUTOBAN || true // Whether or not to enforce auto-banning after a specified number of warnings.
export const autoBanWarns = process.env.AUTOBAN_WARNS || 3 // Amount of warnings to warrant an auto-ban if enabled.
export const banMsgDelete = process.env.BAN_MSG_DELETE || 0 // Default number of days to delete a banned user's messages from.
export const channels = {
  warn: process.env.CHANNEL_WARN || 'warnings', // Channel to forward all warning confirmation messages.
  ban: process.env.CHANNEL_BAN || 'bans', // Channel to forward all ban confirmation messages.
  report: process.env.CHANNEL_REPORT || 'reports', // Channel to forward all user report messages.
  roles: process.env.CHANNEL_ROLES || 'roles', // Channel to send and listen to reactions for roles.
  info: process.env.CHANNEL_INFO || 'info', // Channel to send the info to.
  crusade: process.env.CHANNEL_CRUSADE || 'crusade', // Channel to send notifications that the anti bot crusade has deleted a message.
  errors: process.env.CHANNEL_ERRORS || 'errors' // Channel to log errors to.
}
export const roles = {
  muted: process.env.ROLE_MUTED || 'muted', // Name of the role to apply to muted users.
  verified: process.env.ROLE_VERIFIED || 'verified' // Name of the role to apply to verified users.
}
