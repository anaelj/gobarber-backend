import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListDriversService from '@modules/drivers/services/ListDriverService';

export default class DriversFromDriverController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.params;

    const listDriverService = container.resolve(ListDriversService);

    const drivers = await listDriverService.execute({
      name,
      cpf,
    });
    return response.json(drivers);
  }
}
