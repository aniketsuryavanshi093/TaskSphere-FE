/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { ReactNode, useRef, useState } from "react";
import { useFormikContext, getIn } from "formik";
import "./customComp.scss";


type Props = {
  styleData: string;
  style: React.CSSProperties;
  withOutLabel: boolean;
  field: any; form: any;
  label: string;
  name: string
  classNameDiv: string
  disabled: boolean
  val: boolean
  withIcon: boolean
  Icon: ReactNode
  id: string
  inputClassName: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean;
  pswClassName: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export const CustomInput: React.FC<Props> = ({ field, form: { touched, errors }, ...props }) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  return (
    <>   <div className={`${props.styleData} position-relative space-y-10`} style={props.style}>
      {!props.withOutLabel && <span className="nameInput">{props.label}</span>}
      <input
        className={`form-control ${error && touch && "is-invalid"} ${props.inputClassName
          } `}
        {...field}
        {...props}
      />
      {
        props.withIcon && (
          props.Icon
        )
      }
    </div>
      {
        error && touch && (
          <div className="invalid-feedback d-block mb-1">{error}</div>
        )
      }
    </>
  );
};
export const CustomPswInput: React.FC<Props> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div
      className={`${props.styleData} space-y-10 ${props.pswClassName}`}
      style={props.style}
    >
      {!props.withOutLabel && <span className="nameInput">{props.label}</span>}
      <div className="position-relative">
        <input
          className={`form-control ${error && touch && "is-invalid"} ${props.inputClassName
            } `}
          {...field}
          {...props}
        />
        {
          props.withIcon && (
            props.Icon
          )
        }
        <i
          onClick={() => props.setShow((prev: any) => !prev)}
          className={`${props.show ? "fas fa-eye-slash" : "fas fa-eye"} ${error && touch ? "eye_after_error" : "eye_before_error"
            } cp`}
        />
      </div>
      {error && touch && (
        <div className="invalid-feedback d-block mb-1">{error}</div>
      )}
    </div>
  );
};

export const CustomTextArea: React.FC<Props> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div className={`${props.styleData} space-y-10`} style={props.style}>
      {!props.withOutLabel && (
        <span className="nameInput">
          {props.label}
        </span>
      )}
      <textarea
        className={`form-control ${error && touch && "is-invalid"} ${props.inputClassName
          } `}
        {...field}
        {...props}
      />
      {error && touch && (
        <div className="invalid-feedback d-block mb-1">{error}</div>
      )}
    </div>
  );
};

export const CustomDateInput: React.FC<Props> = ({ field, form: { touched, errors }, ...props }) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const dateRef = useRef<any>();
  const [inputType, setInputType] = useState('text');
  return (
    <div className={`${props.styleData}`} style={props.style}>
      {!props.withOutLabel && <span className="nameInput">{props.label}</span>}
      <div className="position-relative">
        <input
          className={`form-control ${error && touch && 'is-invalid'} ${props.inputClassName} `}
          {...field}
          {...props}
          ref={dateRef}
          onClick={() => dateRef.current.focus()}
          onFocus={() => {
            dateRef.current.type = 'date';
            setInputType('date');
            dateRef.current.focus()
          }}
          onBlur={() => {
            dateRef.current.type = 'text';
            setInputType('text');
          }}
        />
        <i
          ref={dateRef}
          className={`${inputType === 'date' ? 'd-none' : ''} fa-regular fa-calendar custom_date_picker_icon`}
        />
      </div>
      {error && touch && <div className="invalid-feedback d-block mb-1">{error}</div>}
    </div>
  );
};

export const CustomRadioButton: React.FC<Props> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  return (
    <>
      <div className={`${props.styleData} space-y-10`} style={props.style}>
        <div className="d-flex space-x-10 switch_item">
          <label className={`${props.classNameDiv} d-flex mx-2`}>
            <input
              {...props}
              className={` ${error && touch && "is-invalid"} ${props.inputClassName
                }`}
              id={props.label}
              {...field}
              onChange={(e) => {
                props.handleChange(e);
              }}
            />
            <span className="label-span mx-2">{props.label}</span>
          </label>
          {/* {!props.withOutLabel && (
            <span className="nameInput">
              {props.label}
              {props.requiredField && <span className="mendatory_sign">*</span>}
            </span>
          )} */}
          {/* <label className="" htmlFor={props.label} /> */}
        </div>
        {error && touch && <div className="invalid-feedback">{error}</div>}
      </div>
    </>
  );
};

export const CustomCheckbox: React.FC<Props> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <div className="cursor-pointer custom-checkbox wrapper justify-content-start">
        <input
          name={props.name}
          id={props.id}
          type="checkbox"
          className={`${error && touch && "is-invalid"} cp`}
          checked={props.val}
          disabled={props.disabled}
          onChange={() => {
            setFieldValue(field.name, !props.val);
          }}
        />
        <label
          className={`${props.inputClassName} d-flex`}
          htmlFor={props.id}
          style={{ userSelect: "none" }}
        >
          {props.label}
        </label>
      </div>
      {error && touch && (
        <div className="invalid-feedback d-block mt-0">{error}</div>
      )}
    </>
  );
};

export const handleDate = () => "dd/MM/yyyy";

export const handleDatePicker = () => "dd/MM/yyyy";
