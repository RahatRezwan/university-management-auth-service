/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function universityDatabase() {
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

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received')
  if (server) {
    server.close()
  }
})
