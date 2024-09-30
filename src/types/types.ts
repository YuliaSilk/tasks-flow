export type CardProps = {
    _id: number | string ;
    title: string;
    description: string;
    columnId?: number | string;
    boardId?: number | string;
}

export type BoardProps = {
    _id: number | string;
    title?: string;
    columns?: ColumnProps[];
    cards?: CardProps[];
    boardId?: number | string;
}

export type ColumnProps = {
    _id: number | string;
    name: string;
    cards?: CardProps[];
    boardId?: number | string;
}

export type ButtonProps = {
    onClick?: () => void;
}