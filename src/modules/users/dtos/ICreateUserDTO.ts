export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  transportadora_id?: string;
  admin_flex: string;
  admin_transportadora: string;
  cpf : string ;
}
