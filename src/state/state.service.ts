import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';

@Injectable()
export class StateService {
    create(createStateDto: CreateStateDto) {
        return 'This action adds a new state';
    }
}
