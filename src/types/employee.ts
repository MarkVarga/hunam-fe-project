export enum Sex {
  Female = 0,
  Male = 1,
  Unknown = 2,
}

export enum Education {
  Elementary = 0,
  VocationalSchool = 1,
  ApprenticeshipSchool = 2,
  VocationalSecondarySchool = 3,
  HighSchool = 4,
  College = 5,
  University = 6,
  Other = 7,
}

export enum PaymentMethod {
  Transfer = 0,
  Cash = 1,
  Dispatch = 2,
}

export type Employee = {
  id: number;
  email: string; // must be unique
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO format: YYYY-MM-DD
  placeOfBirth: string;
  mothersFirstName: string;
  mothersLastName: string;

  // Address fields
  country: string;
  zipCode: string;
  parcelNumber: string;
  city: string;
  administrativeArea: string;
  administrativeAreaType: string;
  houseNumber: string;
  building: string;
  staircase: string;
  floor: string;
  door: string;

  phone: string;
  sex: Sex;
  education: Education;
  paymentMethod: PaymentMethod;

  // Conditional fields based on paymentMethod
  bankAccountNumber?: string; // required if paymentMethod === Transfer
  moneyDispatchAddress?: string; // required if paymentMethod === Dispatch
  cashPaymentDay?: number; // required if paymentMethod === Cash

  salary: number; // must be between 200_000 and 500_000 HUF
};
