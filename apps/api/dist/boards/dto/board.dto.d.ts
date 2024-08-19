export declare class BoardDto {
    post_id: number;
    title: string;
    content: string;
    updated_at: Date;
    post_img: string;
    author: string;
    like: number;
    comment: number;
}
export declare class createBoardDto {
    title: string;
    content: string;
    post_img: string | undefined;
    author: string;
}
export declare class resultBoardDto {
    result: boolean;
    msg?: string;
}
