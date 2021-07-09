import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';
import { validate as uuidValidate } from 'uuid';
@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route) private routeRepo: Repository<Route>,
    ) { }

    create (createRouteDto: CreateRouteDto) {
        const route = this.routeRepo.create(createRouteDto);
        return this.routeRepo.save(route);
    }

    findAll () {
        return this.routeRepo.find();
    }

    async findOne (id: string) {
        if (!uuidValidate(id)) {
            throw new TypeError('Invalid UUID ' + id);
        }
        const route = await this.routeRepo.findOne(id);
        if (!route) {
            throw new EntityNotFoundError(Route, id);
        }
        return route;
    }

    async update (id: string, updateRouteDto: UpdateRouteDto) {
        const updateResult = await this.routeRepo.update(id, updateRouteDto);
        if (!updateResult.affected) {
            throw new EntityNotFoundError(Route, id);
        }
        return this.routeRepo.findOne(id);
    }

    async remove (id: string) {
        const deleteResult = await this.routeRepo.delete(id);
        if (!deleteResult.affected) {
            throw new EntityNotFoundError(Route, id);
        }
    }
}
