import { Request, Response } from 'express';
import CreateTransportadoraService from '@modules/transportadoras/services/CreateTransportadoraService';
import UpdateTransportadoraService from '@modules/transportadoras/services/UpdateTransportadoraService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class TransportadorasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, telefone, contato } = request.body;

    const createTransportadora = container.resolve(CreateTransportadoraService);

    const transportadora = await createTransportadora.execute({
      name,
      email,
      telefone,
      contato,
    });

    return response.json(classToClass(transportadora));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //    console.log(request.params);

    const { name, email, telefone, contato } = request.body;

    const updateTransportadora = container.resolve(UpdateTransportadoraService);

    const transportadora = await updateTransportadora.execute({
      transportadora_id: request.params.id,
      name,
      email,
      telefone,
      contato,
    });

    return response.json(classToClass(transportadora));
  }
}
