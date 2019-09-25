import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("user" ,{schema:"public" } )
@Index("user_email_key",["email",],{unique:true})
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"integer",
        name:"id"
        })
    public id:number;


    @Column("text",{
        nullable:false,
        unique: true,
        name:"email"
        })
    public email:string;


    @Column("text",{
        nullable:false,
        name:"password"
        })
    public password:string;


    @Column("text",{
        nullable:false,
        name:"salt"
        })
    public salt:string;



    // @OneToMany(()=>TaskEntity, (task: any)=>task.user, {eager: false})
    // public tasks:TaskEntity[];

}
