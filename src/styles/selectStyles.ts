import { StylesConfig } from "react-select";

// Тип для опцій (має відповідати типу в SearchComponent)
interface BoardOptionType {
  value: string;
  label: string;
}

// Tailwind colors (мають відповідати tailwind.config.js)
const colors = {
  light: {
    background: "#FDFFFC",
    text: "#000229",
    border: "#e802a3", // accent.light
    borderHover: "#bc00dd", // secondary.light
    optionSelectedBg: "#e802a3", // accent.light
    optionSelectedText: "#fff",
    optionHoverBg: "#F5F5F5",
    optionText: "#000229",
  },
  dark: {
    background: "#050e1a",
    text: "#d7d9ff",
    border: "#fd14b6", // accent.dark
    borderHover: "#9e019e", // secondary.dark
    optionSelectedBg: "#fd14b6", // accent.dark
    optionSelectedText: "#050e1a",
    optionHoverBg: "#2E2E2E",
    optionText: "#d7d9ff",
  },
};

const getSelectStyles = (theme: "light" | "dark"): StylesConfig<BoardOptionType, false> => ({
  menu: (provided) => ({
    ...provided,
    backgroundColor: colors[theme].background,
    color: colors[theme].text,
    borderRadius: "20px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    zIndex: 999,
    maxHeight: "200px",
    overflowY: "auto",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? colors[theme].optionSelectedBg
      : state.isFocused
        ? colors[theme].optionHoverBg
        : colors[theme].background,
    color: state.isSelected
      ? colors[theme].optionSelectedText
      : colors[theme].optionText,
    cursor: "pointer",
    borderRadius: "12px",
    padding: "10px 16px",
    fontWeight: state.isSelected ? 700 : 500,
    transition: "all 0.2s",
    "&:active": {
      backgroundColor: colors[theme].optionSelectedBg,
    },
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: colors[theme].background,
    color: colors[theme].text,
    borderColor: state.isFocused ? colors[theme].border : colors[theme].borderHover,
    boxShadow: state.isFocused ? `0 0 0 3px ${colors[theme].border}33` : "none",
    borderRadius: "20px",
    border: `1px solid ${state.isFocused ? colors[theme].border : colors[theme].borderHover}`,
    height: "56px",
    padding: "0 16px",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme === "dark" ? colors.dark.optionHoverBg : colors.light.optionHoverBg,
      borderColor: colors[theme].borderHover,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: colors[theme].text,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme === "light" ? "rgba(0, 2, 41, 0.7)" : "rgba(215, 217, 255, 0.7)",
  }),
  input: (provided) => ({
    ...provided,
    color: colors[theme].text,
  }),
});
   
export default getSelectStyles;