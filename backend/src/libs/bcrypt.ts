import { compare, hash } from "bcrypt"

class Crypt {
  private rounds

  constructor(rounds: number) {
    this.rounds = rounds
  }

  public async hashPassword(password: string): Promise<string> {
    return await hash(password, this.rounds)
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }
}

const crypt = new Crypt(10)

export { crypt }