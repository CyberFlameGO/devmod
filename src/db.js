/*
 * Gabe Dunn 2019
 * Contains all functions that interact with the database.
 */

import { Datastore } from 'nedb-async-await'
import { dbFile } from './utils/config'

// Create and initialize the database using auto-loading and the configured filename.
const db = new Datastore({
  autoload: true,
  filename: dbFile
})

// Object containing default values to return if there isn't an entry in the database.
const defaultDBValues = {
  owner: 'RedXTech#3076',
  test: 'default value',
  reactions_message_ids: {},
  warnings: {}
}

// Given a key and a value, sets the 'key' document in the database to have a value of 'value'.
export const setSetting = async (key, value) => {
  try {
    // Update database entries with a key of 'key' with the new values. Upsert: create new document if one doesn't already exist.
    await db.update({ key }, { key, value }, { upsert: true })
  } catch (err) {
    console.error(`setSetting: ${key}:${value}  Failed:`, err)
  }
}

// Returns the value in the database for the given key if it exists, otherwise returns the default value from defaultDBValues.
export const getSetting = async key => {
  try {
    // Search the database for any one document with a key of 'key' and save it to setting.
    const setting = await db.findOne({ key })
    // If 'key' exists (setting !== null), setting has more than 0 entries, and has a value property return the value. Otherwise return the default value.
    if (setting !== null && Object.entries(setting).length > 0 && setting.hasOwnProperty('value')) {
      return setting.value
    } else {
      return defaultDBValues[key]
    }
  } catch (err) {
    console.error(`getSetting: ${key} Failed:`, err)
  }
}

// Given a user, reason, and staff member, pushes a warning into the database.
export const addWarning = async (user, reason, staff) => {
  // Create the warning object.
  const warning = { reason, staff, timestamp: new Date() }

  // Create the push object and add the warning to it.
  const $push = {}
  $push[user] = warning

  try {
    // Update the database by pushing the warning to the user.
    await db.update({ key: 'warnings' }, { $push }, { upsert: true })
  } catch (err) {
    console.error('addWarning Failed:', err)
  }
}

// Given a user, returns a list of warnings from the database.
export const getWarnings = async user => {
  try {
    // Pull the warnings from the database.
    const warnings = await db.findOne({ key: 'warnings' })
    // If warnings isn't null, continue.
    if (warnings !== null) {
      // If warnings has the property 'user', return the property.
      if (warnings.hasOwnProperty(user)) {
        return warnings[user]
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (err) {
    console.error('getWarning Failed:', err)
  }
}
