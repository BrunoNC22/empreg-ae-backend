import { User } from 'src/domain/entities/User'

describe('User', () => {
  it('should create an user with all default values', () => {
    const user = new User('name', 'email')

    expect(user.name).toBe('name')
    expect(user.email).toBe('email')
    expect(user.age).toBe(null)
    expect(user.city).toBe(null)
    expect(user.id).toBeTruthy()
  })

  it('Should throw error when age is less than 0', () => {
    const user = new User('name', 'email')

    expect(() => {
      user.age = -1
    }).toThrow(new Error('Age cannot be negative'))
  })
})
