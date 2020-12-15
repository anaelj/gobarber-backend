import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';

export default class DriversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.body;

    const createDriver = container.resolve(CreateDriverService);

    const driver = await createDriver.execute({
      name,
      cpf,
    });

    return response.json(driver);
  }
}
