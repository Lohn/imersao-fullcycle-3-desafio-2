import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
//ORM Object Relation Mapper
//Repository
@Entity({ name: 'routes' })
export class Route {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    startPosition: string;

    @Column()
    endPosition: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generateId () {
        if (this.id) {
            return;
        }
        this.id = uuidv4();
    }

}
