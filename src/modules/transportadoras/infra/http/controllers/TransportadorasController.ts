import { Request, Response } from 'express';
import CreateTransportadoraService from '@modules/transportadoras/services/CreateTransportadoraService';
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
}
