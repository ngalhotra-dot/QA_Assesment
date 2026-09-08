import { test, expect } from '@playwright/test';
import { validateUserResponse } from '../utils/responseValidator';

test.describe('API Response Validation', () => {

  test('should validate a valid user response', () => {

    const response = {
      id: 101,
      name: 'Test',
      email: 'test@example.com',
      roles: ['ADMIN', 'User']
    };

    expect(() => validateUserResponse(response))
      .not.toThrow();
  });

  test('should reject non-numeric id', () => {

    const response = {
      id: '101',
      name: 'Test',
      email: 'test@example.com',
      roles: ['ADMIN']
    };

    expect(() => validateUserResponse(response))
      .toThrow('id must exist and must be numeric');
  });

  test('should reject empty name', () => {

    const response = {
      id: 101,
      name: '   ',
      email: 'test@example.com',
      roles: ['ADMIN']
    };

    expect(() => validateUserResponse(response))
      .toThrow('name must exist and must not be empty');
  });

  test('should reject invalid email', () => {

    const response = {
      id: 101,
      name: 'Test',
      email: 'invalid-email',
      roles: ['ADMIN']
    };

    expect(() => validateUserResponse(response))
      .toThrow('email must have a valid format');
  });

  test('should reject empty roles', () => {

    const response = {
      id: 101,
      name: 'Test',
      email: 'test@example.com',
      roles: []
    };

    expect(() => validateUserResponse(response))
      .toThrow('roles must exist and contain at least one role');
  });
});