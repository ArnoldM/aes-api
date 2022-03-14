import { SerializeInterceptor } from './serialize.interceptor';
import { UserDto } from '../users/dto/user.dto';

describe('SerializeInterceptor', () => {
  it('should be defined', () => {
    expect(new SerializeInterceptor(UserDto)).toBeDefined();
  });
});
