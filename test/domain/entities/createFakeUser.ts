import { User } from 'src/domain/entities/User'

type CreateFakeUserParams = {
  name?: string
  email?: string
}

export const createFakeUser = ({
  email = 'teste@mail.com',
  name = 'teste',
}: CreateFakeUserParams) => {
  return new User(name, email)
}
