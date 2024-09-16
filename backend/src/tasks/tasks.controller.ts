import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { createTaskDto } from './dtos/create-task.dto'
import { updateTaskDto } from './dtos/update-task.dto'
import { JwtAccessGuard } from 'src/guards/jwt-access.guard'
import { Task } from '@prisma/client'
import { CurrentUser } from 'src/utils/decorators/current-user'

@UseGuards(JwtAccessGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async get(@CurrentUser('id', ParseIntPipe) userId: number) {
    return await this.tasksService.get(userId)
  }

    @Post()
    async createOne(
      @Body() dto: createTaskDto, 
      @CurrentUser('id', ParseIntPipe) 
      userId: number
    ) : Promise<Task> {

      return await this.tasksService.createOne(dto, userId)

    }

    @Patch(':id')
    async updateOne(
      @Param('id', ParseIntPipe) id: number, 
      @Body() dto: updateTaskDto,
       @CurrentUser('id', ParseIntPipe) userId: number
      ) {
      return await this.tasksService.updateOne(id, dto, userId)
    }

    @Delete(':id')
    async deleteOne(
      @Param('id', ParseIntPipe) id: number, 
      @CurrentUser('id', ParseIntPipe) userId: number) {
      return await this.tasksService.deleteOne(id, userId)
    }
  
}
