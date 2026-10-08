// Domain error types mapped to HTTP status codes by the central error handler.
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly code = 'INTERNAL_ERROR',
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Invalid request', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Not allowed') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409, 'CONFLICT');
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super(message, 503, 'NOT_CONFIGURED');
  }
}

// Thrown by intentionally stubbed module seams; the message names the phase that
// will deliver the capability so dashboards can surface an honest status.
export class PhaseNotImplementedError extends AppError {
  constructor(phase: number, capability: string) {
    super(
      `${capability} is scheduled for Phase ${phase} of the build plan (see docs/SPEC.md §40).`,
      501,
      'PHASE_NOT_IMPLEMENTED',
      { phase, capability },
    );
  }
}
