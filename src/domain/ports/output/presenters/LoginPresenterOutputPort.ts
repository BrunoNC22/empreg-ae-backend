import { User } from 'src/domain/entities/User'

export interface LoginPresenterOutputPort {
  presentDefaultError(error: Error): void

  presentSuccessLogin(props: { token: string; user: User }): void
}
