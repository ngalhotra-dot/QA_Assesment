export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

export const bookingData: Booking = {
  firstname: 'Neha',
  lastname: 'Automation',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-10-01',
    checkout: '2026-10-05'
  },
  additionalneeds: 'Breakfast'
};

export const updatedBookingData: Booking = {
  firstname: 'NehaUpdated',
  lastname: 'AutomationUpdated',
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-05'
  },
  additionalneeds: 'Lunch'
};