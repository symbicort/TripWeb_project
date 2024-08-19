export interface Board {
    id: string;
    title: string;
    description: string;
    status: Boardstatus.PUBLIC;
}
export declare enum Boardstatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
