import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { BoardDto, createBoardDto } from './dto/board.dto';
export declare class BoardsService {
    private boardsDB;
    private readonly awsService;
    constructor(boardsDB: Repository<BoardsEntity>, awsService: AwsService);
    createBoard(board: createBoardDto, imgUrl: string, writer: string): Promise<boolean>;
    getPost(id: number): Promise<boolean | BoardDto>;
}
