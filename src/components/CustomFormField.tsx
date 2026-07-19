"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useForm,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { userSchema } from "@/utils/vallidation";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { FormFieldType } from "./forms/PatientForm";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  fieldType: FormFieldType;
}
const RenderField = (props: any) => {
  const { fieldType, field } = props;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return <Input {...field} placeholder={props.placeholder} />;

    case FormFieldType.PHONE:
      return (
        <PhoneInput
          defaultCountry="IN"
          international
          value={field.value}
          onChange={field.onChange}
          placeholder={props.placeholder}
        />
      );

    default:
      return null;
  }
};
export default function CustomFormField(props: CustomProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{props.label}</FieldLabel>

          <RenderField
            field={field}
            fieldType={props.fieldType}
            placeholder={props.placeholder}
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
