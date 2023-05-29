import styles from "./styles.module.css";

interface Props {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function Filter({ options, value, onChange }: Props) {
  return (
    <div className={styles.root}>
      {options.map((label) => (
        <button
          key={label}
          className={value === label ? styles.selected : ""}
          onClick={() => onChange(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
