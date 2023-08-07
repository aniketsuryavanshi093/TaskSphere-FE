/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { ReactNode } from "react";
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


// export const CustomDropdownWithImage = ({
//   field,
//   form: { touched, errors },
//   ...props
// }) => {
//   const touch = getIn(touched, field.name);
//   const error = getIn(errors, field.name);

//   return (
//     <>
//       <div className={`${props.styleData} space-y-10`} style={props.style}>
//         {!props.withOutLabel && (
//           <span className="nameInput">
//             {props.label}
//             {props.requiredField && <span className="mendatory_sign">*</span>}
//           </span>
//         )}

//         <select
//           className={`form-select custom-select ${error && touch && "is-invalid"
//             }`}
//           {...field}
//           {...props}
//           onChange={(e) => {
//             field.onChange(e);
//             if (props.handleChange) {
//               props.handleChange(e);
//             }
//           }}
//         >
//           <option value="Select">Select...</option>
//           {props.data &&
//             props.data.map((i, idx) => (
//               <option
//                 key={idx}
//                 value={i.value}
//                 // eslint-disable-next-line max-len
//                 data-thumbnail="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MO-supp-E.svg/600px-MO-supp-E.svg.png"
//               >
//                 {i.label}
//               </option>
//             ))}
//         </select>
//         {error && touch && <div className="invalid-feedback">{error}</div>}
//       </div>
//     </>
//   );
// };
// export const CustomReactSelect = ({
//   field,
//   options,
//   isMulti = false,
//   form: { touched, errors },
//   ...props
// }) => {
//   const touch = getIn(touched, field.name);
//   const error = getIn(errors, field.name);
//   const { setFieldValue } = useFormikContext();
//   const onChange = option => {
//     setFieldValue(field.name, isMulti ? option.map(item => item.value) : option.value);
//   };

//   const getValue = () => {
//     if (options) {
//       return isMulti
//         ? options.filter(option => field.value.indexOf(option.value) >= 0)
//         : options.find(option => option.value === field.value);
//     }
//     return isMulti ? [] : '';
//   };

//   return (
//     <>
//       <div className={`${props.styleData} space-y-10`} style={props.style}>
//         {!props.withOutLabel && (
//           <span className="nameInput">
//             {props.label}
//             {props.requiredField && <span className="mendatory_sign">*</span>}
//           </span>
//         )}
//         <Select
//           className={` ${error && touch && 'is-invalid'}`}
//           name={field.name}
//           value={getValue()}
//           onChange={onChange}
//           placeholder={props.placeholder}
//           options={options}
//           isMulti={isMulti}
//         />
//         {error && touch && <div className="invalid-feedback">{error}</div>}
//       </div>
//     </>
//   );
// };

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

// export const CustomDateInputLog = ({ field, form: { touched, errors }, ...props }) => {
//   const { setFieldValue } = useFormikContext();
//   const touch = getIn(touched, field.name);
//   const error = getIn(errors, field.name);
//   // const handleDate = () => 'dd/MM/yyyy';
//   const handleDatePicker = () => 'dd/MM/yyyy';
//   return (
//     <div className="col-md-3 form-group">
//       <label htmlFor className="small text-secondary fw-600">
//         {props.label}
//       </label>
//       <div className="input-group mb-0">
//         <DatePicker
//           dateFormat={handleDatePicker()}
//           autoComplete="off"
//           className={`form-control shadow-none ${error && touch && 'is-invalid'}`}
//           {...field}
//           {...props}
//           selected={(field.value && new Date(field.value)) || null}
//           onChange={val => setFieldValue(field.name, val)}
//         />
//       </div>
//       {error && touch && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

export const handleDate = () => "dd/MM/yyyy";

export const handleDatePicker = () => "dd/MM/yyyy";
