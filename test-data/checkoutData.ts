import { AddressData } from '../pages/CheckoutPage';

export interface TestDataset {
  name: string;
  userEmail: string;
  userPassword: string;
  billingAddress: AddressData;
}

export const datasets: TestDataset[] = [
  {
    name: 'US customer 1',
    userEmail: `user_${Date.now()}_1@test.com`,
    userPassword: 'Password123!',
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: `user_${Date.now()}_1@test.com`,
      country: 'United States',
      city: 'New York',
      address1: '123 Main St',
      zip: '10001',
      phone: '1234567890',
    },
  },
  {
    name: 'UK customer 2',
    userEmail: `user_${Date.now()}_2@test.com`,
    userPassword: 'Password123!',
    billingAddress: {
      firstName: 'Alice',
      lastName: 'Smith',
      email: `user_${Date.now()}_2@test.com`,
      country: 'United Kingdom',
      city: 'London',
      address1: '221B Baker Street',
      zip: 'NW16XE',
      phone: '0201234567',
    },
  },
];
