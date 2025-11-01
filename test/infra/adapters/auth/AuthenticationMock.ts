import { AuthenticationOutputPort } from 'src/domain/ports/output/auth/AuthenticationOutputPort'

export class AuthenticationMock implements AuthenticationOutputPort {
  jwtResponse: string = 'valid jwt'
  userId: string | null = null
  constructor(_jwtResponse?: string) {
    if (_jwtResponse) {
      this.jwtResponse = _jwtResponse
    }
  }

  generateJwtFromUserId(userId: string): string {
    this.userId = userId
    return this.jwtResponse
  }
}
