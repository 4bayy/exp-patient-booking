import { string } from "zod"

export enum FormFieldType {
  INPUT = "input",
  PHONE = "phone",
  DATE_PICKER = "datetimepicker",
  GENDER = "radio",
  SKELTON = "skelton",
  TEXT_AREA="textarea",
  SELECT="select",
  CHECKBOX ="checkbox",
  DATE_TiME_PICKER="datepicker"
}

export interface EnquiryData {

  userId: string,
  spaId: string,
  fullName: string,
  email: string,
  phoneNumber: "string",
  dateOfBirth: "2026-08-02T07:55:39.337Z",
  gender: string,
  address: string,
  occupation: string,
  emergencyContactName: string,
  emergencyContactNumber: string,
  insuranceProvider: string,
  insurancePolicyNumber: string,
  medicalConditions: string
}