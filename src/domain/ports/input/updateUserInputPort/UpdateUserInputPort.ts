import { UpdateUserDto } from './UpdateUserInputDto'

export interface UpdateUserInputPort {
  updateUser(user: UpdateUserDto): Promise<void>
}
