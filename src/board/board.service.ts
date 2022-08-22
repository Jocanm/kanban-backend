import { Injectable, Logger, InternalServerErrorException, NotFoundException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from '../board/entities/board.entity';
import { Repository } from 'typeorm';
import { State } from '../state/entities/state.entity';

const loggerInstance = new Logger('BoardService');
@Injectable()
export class BoardService {

    private readonly logger = loggerInstance;

    constructor(
        @InjectRepository(Board)
        private readonly boardRepo: Repository<Board>,

        @InjectRepository(State)
        private readonly stateRepo: Repository<State>
    ) { }

    async create(createBoardDto: CreateBoardDto, userId: string) {

        try {

            const { states, title } = createBoardDto;

            const board = this.boardRepo.create({
                title,
                user: { id: userId },
            });

            const boardCreated = await this.boardRepo.save(board);

            const statesToCreate = []

            states.forEach(title => {
                const state = this.stateRepo.create({
                    title, board:
                        { id: boardCreated.id }
                });
                statesToCreate.push(state);
            })

            await this.stateRepo.save(statesToCreate);

            return boardCreated;

        } catch (error) {

            this.logger.error(error);
            throw new InternalServerErrorException("Error creating board, check server logs");
        }

    }

    async getAllBoardsOfUser(userId: string) {

        try {

            const boards = await this.boardRepo.findBy({
                user: { id: userId }
            });

            return boards;

        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException("Error getting boards, check server logs");
        }

    }

    async delete(boardId: string, userId: string) {


        const board = await this.boardRepo.findOneBy({ id: boardId })

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        if (board.user.id !== userId) {
            throw new UnauthorizedException("User is not authorized to delete this board");
        }

        await this.boardRepo.remove(board);

        return {
            message: "Board deleted"
        }

    }
}
