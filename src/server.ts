import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function universityDatabase() {
  try {
    await mongoose.connect(`${config.database_url}`)
    logger.info(`Database is connected successfully`)
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect`, error)
  }
}

universityDatabase()
