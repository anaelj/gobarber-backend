import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateTransportadoraAvatarService from '@modules/transportadoras/services/UpdateTransportadoraAvatarService';
import { classToClass } from 'class-transformer';

export default class transportadoraAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateTransportadoraAvatarService = container.resolve(
      UpdateTransportadoraAvatarService,
    );
    const transportadora = await updateTransportadoraAvatarService.execute({
      transportadora_id: request.transportadora.id,
      avatarFilename: request.file.filename,
    });
    return response.json(classToClass(transportadora));
  }
}
