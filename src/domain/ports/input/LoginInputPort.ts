export interface LoginInputPort {
  login(name: string, email: string): Promise<void>
}
