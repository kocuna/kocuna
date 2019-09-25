import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {UserEntity} from "./UserEntity";
import { ModuleRef } from '@nestjs/core';


@Entity("task" ,{schema:"public" } )
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type:"integer",
        name:"id"
        })
    public id:number;


    @Column("text",{
        nullable:false,
        name:"title"
        })
    public title:string;


    @Column("text",{
        nullable:false,
        name:"description"
        })
    public description:string;


    @Column("enum",{
        nullable:false,
        default: () => "'open'",
        enum:["open","inProgress","done"],
        name:"status"
        })
    public status:"open"|"inProgress"|"done";



    @ManyToOne(()=>UserEntity, (user: any)=>user.tasks,{  nullable:false, eager: true})
    @JoinColumn({ name:'user_id'})
    public user:UserEntity;

    @Column("integer",{
      nullable:false,
      name:"user_id"
    })
    @RelationId((task: TaskEntity) => task.user)
    public userId: number;
}
