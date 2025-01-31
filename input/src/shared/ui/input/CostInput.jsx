import { useState, useEffect, useRef, useId } from "react";
import lib from "@/shared/lib";
import "./CostInput.css";

export const CostInput = ({
  value: externalValue,
  onChange,
  placeholder,
  min = -Infinity,
  max = Infinity,
  defaultValue = "",
  ...otherProps
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputWidth, setInputWidth] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const inputId = useId();

  // Флаг - управляемый компонент или нет
  const isControlled = externalValue !== undefined && onChange !== undefined;
  const value = isControlled ? externalValue : internalValue;
  const isInputFocused = isFocused || value;
  // Форматированное значение для отображения
  const displayValue = lib.formatNumber(value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = () => {
    let val = inputRef.current.value;
    val = lib.normalizeNumber(val);
    if (lib.isValidateNumber(val)) {
      isControlled ? onChange(val) : setInternalValue(val);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      return;
    }

    let numValue = Number(lib.normalizeNumber(value));
    if (isNaN(numValue)) {
      numValue = "";
    }

    if (numValue < min) numValue = min;
    if (numValue > max) numValue = max;

    const stringValue = numValue.toString();
    isControlled ? onChange(stringValue) : setInternalValue(stringValue);
  };

  // Обновляем ширину инпута при изменении значения
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(lib.changeWidth(value));
    }
  }, [value]);

  return (
    <div className={`input-container ${isInputFocused ? "focused" : ""}`}>
      <input
        type="text"
        id={inputId}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: `${inputWidth}ch` }}
        ref={inputRef}
        {...otherProps}
      />
      <label className="placeholder" htmlFor={inputId}>
        {placeholder}
      </label>
    </div>
  );
};
