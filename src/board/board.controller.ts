import { Body, Controller, Post } from '@nestjs/common';
import { Auth, GetUser } from '../auth/decorators';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) { }

    @Post()
    @Auth()
    create(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser('id') userId: string,
    ) {
        return this.boardService.create(createBoardDto, userId);
    }
}
