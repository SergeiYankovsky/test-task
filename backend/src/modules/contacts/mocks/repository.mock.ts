import { MockType } from "src/types";
import { Repository } from "typeorm";

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  delete: jest.fn(entity => entity),
  findOneOrFail: jest.fn(entity => entity),
}));