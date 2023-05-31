import { User } from './users.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateID = async () => {
  const currentId = (await findLastUserId()) || '0'
  //increment by 1
  const incrementedId = parseInt(currentId) + 1
  return incrementedId.toString().padStart(5, '0')
}
