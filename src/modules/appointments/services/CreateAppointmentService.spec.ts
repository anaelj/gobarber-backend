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

  });

  it('should be able to create a new appointment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
      return new Date(2020, 4,10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123455',
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {

    const appointmentDate = new Date(2020, 4, 10, 11);

     createAppointment.execute({
      date: appointmentDate,
      user_id: '123455',
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123456',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on the past date', async () => { 
    jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
      return new Date(2020, 4,10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123455',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);        
  });

  it('should not be able to create an appointment with same user as provider', async () => { 
    jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
      return new Date(2020, 4,10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123456',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);        
  });

  it('should not be able to create an appointment before 8am and after 5pm ', async () => { 
    jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
      return new Date(2020, 4,10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);        
    
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);        
  });
});
