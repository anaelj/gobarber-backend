import IDriversDTO from '@modules/drivers/dtos/IDriversDTO';
import Driver from '../infra/typeorm/entities/Drivers';

export default interface IDriversRepository {
  create(data: IDriversDTO): Promise<Driver>;
  findAllDrivers(data: IDriversDTO): Promise<Driver[]>;
  findDriverByCPF(cpfmotorista: string): Promise<Driver | undefined>;
}
