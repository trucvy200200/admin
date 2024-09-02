// ** React Imports
import { forwardRef, useState } from "react"

// ** Third Party Components
import PropTypes from "prop-types"
import { Eye, EyeOff } from "react-feather"
import classnames from "classnames"
import { InputGroup, Input, InputGroupText } from "reactstrap"
import { Controller } from "react-hook-form"

const InputPincodeValidate = forwardRef((props, ref) => {
  // ** Props
  const { hideIcon, showIcon, visible, className, placeholder, iconSize, invalid, inputClassName, name, control } = props

  // ** State
  const [inputVisibility, setInputVisibility] = useState(visible)

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 16

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <Eye size={size} />
    } else {
      return showIcon ? showIcon : <EyeOff size={size} />
    }
  }

  return (
    <InputGroup className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field }) => {
          return (
            <Input
              invalid={invalid}
              type={inputVisibility === false ? "password" : "text"}
              placeholder={placeholder ? placeholder : "············"}
              className={classnames({
                [inputClassName]: inputClassName
              })}
              {...field}
            />
          )
        }}
      />
      <InputGroupText className="cursor-pointer" onClick={() => setInputVisibility(!inputVisibility)}>
        {renderIcon()}
      </InputGroupText>
    </InputGroup>
  )
})

export default InputPincodeValidate

// ** PropTypes
InputPincodeValidate.propTypes = {
  invalid: PropTypes.bool,
  hideIcon: PropTypes.node,
  showIcon: PropTypes.node,
  visible: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  iconSize: PropTypes.number,
  inputClassName: PropTypes.string,
  label(props, propName, componentName) {
    // ** If label is defined and htmlFor is undefined throw error
    if (props[propName] && props["htmlFor"] === "undefined") {
      throw new Error("htmlFor prop is required when label prop is present")
    }
  },
  htmlFor(props, propName, componentName) {
    // ** If htmlFor is defined and label is undefined throw error
    if (props[propName] && props["label"] === "undefined") {
      throw new Error("label prop is required when htmlFor prop is present")
    }
  }
}

// ** Default Props
InputPincodeValidate.defaultProps = {
  visible: false
}
