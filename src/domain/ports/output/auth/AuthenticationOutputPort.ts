export interface JwtAuthenticationOutputPort {
  generateJwtFromUserId(userId: string): string
}

export interface AuthenticationOutputPort extends JwtAuthenticationOutputPort {}
