import { User } from 'src/domain/entities/User'
import { LoginPresenterOutputPort } from 'src/domain/ports/output/presenters/LoginPresenterOutputPort'

export class LoginPresenterMock implements LoginPresenterOutputPort {
  defaultError: Error | null = null
  successLoginProps: { token: string; user: User } | null = null
  presentDefaultError(error: Error): void {
    this.defaultError = error
  }

  presentSuccessLogin(props: { token: string; user: User }): void {
    this.successLoginProps = props
  }
}
