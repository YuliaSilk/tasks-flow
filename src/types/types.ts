export type ID = string;
export type BoardID = ID;
export type ColumnID = ID;
export type CardID = ID;

export type ButtonProps = {
    onClick?: () => void;
    onConfirm?: () => void;
}