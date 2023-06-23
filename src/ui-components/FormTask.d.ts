/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FormTaskInputValues = {
    name?: string;
    description?: string;
    done?: boolean;
};
export declare type FormTaskValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    done?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FormTaskOverridesProps = {
    FormTaskGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextAreaFieldProps>;
    done?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FormTaskProps = React.PropsWithChildren<{
    overrides?: FormTaskOverridesProps | undefined | null;
} & {
    onSubmit: (fields: FormTaskInputValues) => void;
    onChange?: (fields: FormTaskInputValues) => FormTaskInputValues;
    onValidate?: FormTaskValidationValues;
} & React.CSSProperties>;
export default function FormTask(props: FormTaskProps): React.ReactElement;
