export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  transportadora_id?: string;
}
