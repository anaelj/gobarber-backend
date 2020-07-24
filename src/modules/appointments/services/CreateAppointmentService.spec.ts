import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentRespository : FakeAppointmentsRespository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
     fakeAppointmentRespository = new FakeAppointmentsRespository();
     createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
    );

  })

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });
});

describe('CreateAppointment', () => {
  it('should not be able to create two appointments on the same time', async () => {

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
