import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
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

    @Get()
    @Auth()
    async getAll(@GetUser('id') userId: string) {
        return this.boardService.getAllBoardsOfUser(userId);
    }

    @Delete(':id')
    @Auth()
    async update(
        @GetUser('id') userId: string,
        @Param('id', ParseUUIDPipe) boardId: string,
    ) {

        return this.boardService.delete(boardId, userId);
    }
}
