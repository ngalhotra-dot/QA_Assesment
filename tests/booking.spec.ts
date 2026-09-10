import {
  test,
  expect,
  APIRequestContext
} from '@playwright/test';

import { BookingApi } from '../api/bookingApi';
import {
  bookingData,
  updatedBookingData
} from '../test-data/bookingData';
import process from 'process';

const username = process.env.API_USERNAME || 'admin';
const password = process.env.API_PASSWORD || 'password123';

//const username = process.env.API_USERNAME;
//const password = process.env.API_PASSWORD;


  test.only('Booking Lifecycle', async ({request}) => {
 const bookingApi = new BookingApi(request);
    // 1. Authenticate
    const authResponse = await bookingApi.authenticate(
      username,
      password
    );

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();

    expect(authBody.token).toBeTruthy();

    const token = authBody.token;

    // 2. Create booking
    const createResponse =
      await bookingApi.createBooking(bookingData);

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    // 3. Capture booking ID dynamically
    const bookingId = createBody.bookingid;

    expect(bookingId).toBeTruthy();
    expect(typeof bookingId).toBe('number');

    // Validate created booking data
    expect(createBody.booking.firstname)
      .toBe(bookingData.firstname);

    expect(createBody.booking.lastname)
      .toBe(bookingData.lastname);

    expect(createBody.booking.totalprice)
      .toBe(bookingData.totalprice);

    expect(createBody.booking.depositpaid)
      .toBe(bookingData.depositpaid);

    // 4. Retrieve and validate booking
    const getResponse =
      await bookingApi.getBooking(bookingId);

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    expect(getBody.firstname)
      .toBe(bookingData.firstname);

    expect(getBody.lastname)
      .toBe(bookingData.lastname);

    expect(getBody.totalprice)
      .toBe(bookingData.totalprice);

    expect(getBody.depositpaid)
      .toBe(bookingData.depositpaid);

    expect(getBody.bookingdates.checkin)
      .toBe(bookingData.bookingdates.checkin);

    expect(getBody.bookingdates.checkout)
      .toBe(bookingData.bookingdates.checkout);

    // 5. Update booking
    const updateResponse =
      await bookingApi.updateBooking(
        bookingId,
        token,
        updatedBookingData
      );

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.firstname)
      .toBe(updatedBookingData.firstname);

    expect(updateBody.lastname)
      .toBe(updatedBookingData.lastname);

    expect(updateBody.totalprice)
      .toBe(updatedBookingData.totalprice);

    expect(updateBody.depositpaid)
      .toBe(updatedBookingData.depositpaid);

    // 6. Retrieve and verify updated booking
    const updatedGetResponse =
      await bookingApi.getBooking(bookingId);

    expect(updatedGetResponse.status()).toBe(200);

    const updatedGetBody =
      await updatedGetResponse.json();

    expect(updatedGetBody.firstname)
      .toBe(updatedBookingData.firstname);

    expect(updatedGetBody.lastname)
      .toBe(updatedBookingData.lastname);

    expect(updatedGetBody.totalprice)
      .toBe(updatedBookingData.totalprice);

    expect(updatedGetBody.depositpaid)
      .toBe(updatedBookingData.depositpaid);

    expect(updatedGetBody.bookingdates.checkin)
      .toBe(updatedBookingData.bookingdates.checkin);

    expect(updatedGetBody.bookingdates.checkout)
      .toBe(updatedBookingData.bookingdates.checkout);
// patch

/*const response = await request.patch(`/booking/${bookingId}`, {
  headers: {
    Cookie: `token=${token}`
  },
  data: {
    totalprice: 250
  }
});
*/



    // 7. Delete booking
    const deleteResponse =
      await bookingApi.deleteBooking(
        bookingId,
        token
      );

    expect(deleteResponse.status()).toBe(201);

    // 8. Verify booking has been deleted
    const deletedGetResponse =
      await bookingApi.getBooking(bookingId);

    expect(deletedGetResponse.status()).toBe(404);
  });

  test.describe('Negative Scenarios', () => {
  test('Negative - retrieve booking using a non-existent booking ID', async ({request}) => {
    const bookingApi = new BookingApi(request);
    const invalidBookingId = 999999999;

    const response =
      await bookingApi.getBooking(invalidBookingId);

    expect(response.status()).toBe(404);
  });

  test('Negative - update booking without authentication token', async ({request}) => {
    const bookingApi = new BookingApi(request);
  const authResponse =
    await bookingApi.authenticate(
      username,
      password
    );

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();

  const token = authBody.token;

  expect(token).toBeTruthy();

  const createResponse =
    await bookingApi.createBooking(bookingData);

  expect(createResponse.status()).toBe(200);

  const createBody =
    await createResponse.json();

  const bookingId =
    createBody.bookingid;

  expect(bookingId).toBeTruthy();

  // Intentionally send update request without authentication
  const response =
    await request.put(`/booking/${bookingId}`, {
      data: updatedBookingData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

  expect(response.status()).toBe(403);

  // Clean up the booking created by this negative test
  const deleteResponse =
    await bookingApi.deleteBooking(
      bookingId,
      token
    );

  expect(deleteResponse.status()).toBe(201);
});



});
//});