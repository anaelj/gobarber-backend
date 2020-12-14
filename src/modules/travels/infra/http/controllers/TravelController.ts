import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTravelService from '@modules/travels/services/CreateTravelService';

export default class TravelsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cte,
      numeroviagem,
      data,
      origem,
      destino,
      mercadoria,
      placa,
      cpfmotorista,
      transportadora_id,
    } = request.body;

    const createTravel = container.resolve(CreateTravelService);

    const travel = await createTravel.execute({
      cte,
      numeroviagem,
      data,
      origem,
      destino,
      mercadoria,
      placa,
      cpfmotorista,
      transportadora_id,
    });

    return response.json(travel);
  }
}
