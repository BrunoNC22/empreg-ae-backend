import { JwtService } from '@nestjs/jwt'
import { RestAuthenticationAdapter } from 'src/infra/adapters/auth/RestAuthenticationAdapter'

describe('RestAuthenticationAdapyer', () => {
  const jwtService = new JwtService()
  const sut = new RestAuthenticationAdapter(jwtService)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call sign from jwtService with correct params', () => {
    jwtService.sign = jest.fn().mockReturnValueOnce('valid token')

    const response = sut.generateJwtFromUserId('valid user id')

    expect(jwtService.sign).toHaveBeenCalledWith({ sub: 'valid user id' })
    expect(response).toBe('valid token')
  })
})
