export type CardProps = {
    _id: string ;
    title: string;
    description: string;
    columnId: string;
    boardId: string;
}

export type BoardProps = {
    _id: string;
    title: string;
    columns: ColumnProps[];
    cards?: CardProps[];
}

export type ColumnProps = {
    _id: string;
    name: string;
    cards?: CardProps[];
    boardId: number | string;
}

export type ButtonProps = {
    onClick?: () => void;
}