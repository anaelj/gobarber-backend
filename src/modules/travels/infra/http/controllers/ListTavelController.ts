import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTravelFromDriver from '@modules/travels/services/ListTravelFromDriver';

export default class TravelsFromDriverController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { cpfmotorista } = request.params;

    const listTravelFromDriver = container.resolve(ListTravelFromDriver);

    const travels = await listTravelFromDriver.execute({
      cpfmotorista,
    });
    return response.json(travels);
  }
}
