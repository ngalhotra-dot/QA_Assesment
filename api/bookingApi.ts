import { APIRequestContext, APIResponse } from '@playwright/test';
import { Booking } from '../test-data/bookingData';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  async authenticate(
    username: string,
    password: string
  ): Promise<APIResponse> {
    return this.request.post('/auth', {
      data: {
        username,
        password
      }
    });
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', {
      data: booking
    });
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }

  async updateBooking(
    bookingId: number,
    token: string,
    booking: Booking
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: booking
    });
  }

  async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });
  }
}