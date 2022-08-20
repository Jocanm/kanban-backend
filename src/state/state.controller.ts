import { Body, Controller, Post } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
    constructor(private readonly stateService: StateService) { }

    @Post()
    create(@Body() createStateDto: CreateStateDto) {
        return this.stateService.create(createStateDto);
    }
}
