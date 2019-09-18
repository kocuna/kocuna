import { ApiResponse } from '@responses/ApiResponse';
import { BaseEntity } from 'typeorm';

export interface EntityConverter<TEntity extends BaseEntity, TResponse extends ApiResponse> {
  toResponse(entity: TEntity): TResponse;
}
