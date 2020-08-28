import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateTranspotadoraAvatarService from '@modules/transpotadoras/services/UpdateTranspotadoraAvatarService';
import { classToClass } from 'class-transformer';

export default class transpotadoraAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateTranspotadoraAvatarService = container.resolve(
      UpdateTranspotadoraAvatarService,
    );
    const transpotadora = await updateTranspotadoraAvatarService.execute({
      transpotadora_id: request.transpotadora.id,
      avatarFilename: request.file.filename,
    });
    delete transpotadora.password;
    return response.json(classToClass(transpotadora));
  }
}
