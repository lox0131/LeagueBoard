import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class User extends Model {

  @PrimaryKey
  @Column
  id!: number;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  summonerName!: string;

  @Column
  regionid!: number;

  @Column
  puuid?: string;

  @CreatedAt
  @Column
  created_at!: Date;
}