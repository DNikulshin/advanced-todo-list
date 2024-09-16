import { Injectable, NotFoundException } from '@nestjs/common'
import { createTaskDto } from './dtos/create-task.dto'
import { Task } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { updateTaskDto } from './dtos/update-task.dto'

@Injectable()
export class TasksService {
    
    constructor( private readonly prismaService: PrismaService) {}

    async get(userId: number) {
        return await this.prismaService.task.findMany({where: {userId}})
    }

    async createOne({title, description}: createTaskDto, userId: number): Promise<Task> {

        const task = await this.prismaService.task.create({
            data: {
                title,
                description,
                userId
            }
        })

        return task
    }

    async updateOne(id:  number, dto: updateTaskDto, userId: number) {
       await this.getOneOrThrow(id)

        const updatedTask = await this.prismaService.task.update({
            where: {id, userId},
            data: dto
        })

        return updatedTask
    }

    async deleteOne(id: number, userId: number) {
        await this.getOneOrThrow(id)

        const deletedTask = await this.prismaService.task.delete({where: {id, userId}})
        
        return deletedTask
    }

    private async getOneOrThrow(id: number, userId?: number) {
        const task = await this.prismaService.task.findUnique({where: {id, userId}})

        if(!task) {
            throw new NotFoundException('Not find any task')
        }

        return task
    }
}
