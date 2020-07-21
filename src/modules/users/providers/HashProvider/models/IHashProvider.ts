export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(pauload: string, hashed: string): Promise<boolean>;
}
