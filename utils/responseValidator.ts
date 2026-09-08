export interface UserResponse {
  id: unknown;
  name: unknown;
  email: unknown;
  roles: unknown;
}

export function validateUserResponse(response: UserResponse): void {

  // ID validation
  if (
    response.id === undefined ||
    response.id === null ||
    typeof response.id !== 'number'
  ) {
    throw new Error('id must exist and must be numeric');
  }

  // Name validation
  if (
    typeof response.name !== 'string' ||
    response.name.trim().length === 0
  ) {
    throw new Error('name must exist and must not be empty');
  }

  // Email validation
  if (
    typeof response.email !== 'string' ||
    response.email.trim().length === 0
  ) {
    throw new Error('email must exist');
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(response.email)) {
    throw new Error('email must have a valid format');
  }

  // Roles validation
  if (
    !Array.isArray(response.roles) ||
    response.roles.length === 0
  ) {
    throw new Error(
      'roles must exist and contain at least one role'
    );
  }
}