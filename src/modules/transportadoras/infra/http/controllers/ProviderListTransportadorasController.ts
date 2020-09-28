import { Request, Response } from 'express';
import ListTransportadoraService from '@modules/transportadoras/services/ListTransportadoraService';
import ShowTransportadoraService from '@modules/transportadoras/services/ShowTransportadoraService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProviderListTransportadorasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { transportadora_id } = request.params;
    //    const { month, year } = request.query; quando for filtrar por email e nome precisa passar esses dados

    //    console.log(transportadora_id);

    const listTransportadoraService = container.resolve(
      ListTransportadoraService,
    );

    const transportadora = await listTransportadoraService.execute({
      transportadora_id,
    });

    return response.json(classToClass(transportadora));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { transportadora_id } = request.params;
    //    const { month, year } = request.query; quando for filtrar por email e nome precisa passar esses dados

    //    console.log(transportadora_id);

    const showTransportadoraService = container.resolve(
      ShowTransportadoraService,
    );

    const transportadora = await showTransportadoraService.execute({
      transportadora_id,
    });

    return response.json(classToClass(transportadora));
  }
}
