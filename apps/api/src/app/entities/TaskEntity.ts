import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("task" ,{schema:"public" } )
export class TaskEntity {

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
        
}
