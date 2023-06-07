/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function universityDatabase() {
  let server: Server
  try {
    await mongoose.connect(`${config.database_url}`)
    logger.info(`Database is connected successfully`)
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect`, error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection rejection is detected')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

universityDatabase()
