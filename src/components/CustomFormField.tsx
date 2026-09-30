"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
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
import { Field, FieldError, FieldLabel } from "./ui/field";
import { FormFieldType } from "@/types/form";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { DatePickerTime } from "./ui/datepicker";

interface CustomProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  fieldType: FormFieldType;
  //  everythiung thast can  be renderd
  renderSkelton?: (field: ControllerRenderProps) => React.ReactNode;
  renderSelect?: (field: ControllerRenderProps) => React.ReactNode;
}
const RenderField = (props: any) => {
  const { fieldType, field, renderSkelton, renderSelect } = props;

  // Dynamic Rendering

  switch (fieldType) {
    case FormFieldType.INPUT:
      return <Input {...field} placeholder={props.placeholder} />;

    case FormFieldType.DATE_TiME_PICKER:
      return (
        <DatePickerTime
          value={field.value}
          onChange={field.onChange}
          time={props.time}
          onTimeChange={props.onTimeChange}
        />
      );
    case FormFieldType.DATE_PICKER:
      return (
        <DatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date: Date | null) => field.onChange(date)}
          placeholderText={props.placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          isClearable
        />
      );

    case FormFieldType.SKELTON:
      return renderSkelton ? renderSkelton(field) : null;

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
    case FormFieldType.TEXT_AREA:
      return <Textarea {...field} placeholder={props.placeholder} />;

    case FormFieldType.SELECT:
      return renderSelect ? renderSelect(field) : null;
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center space-x-2">
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          <label className="text-sm">{props.placeholder}</label>
        </div>
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
            renderSkelton={props.renderSkelton}
            renderSelect={props.renderSelect}
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
