/**
 * Validation utilities for API endpoints
 */

export type ValidationError = {
  field: string
  message: string
}

export function validateRequired(data: Record<string, any>, fields: string[]): ValidationError[] {
  const errors: ValidationError[] = []
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors.push({ field, message: `${field} is required` })
    }
  }
  return errors
}

export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Invalid email format' }
  }
  return null
}

export function validateUrl(url: string): ValidationError | null {
  try {
    new URL(url)
    return null
  } catch {
    return { field: 'url', message: 'Invalid URL format' }
  }
}

export function validateNumber(value: any, field: string, options?: { min?: number; max?: number }): ValidationError | null {
  if (typeof value !== 'number' || isNaN(value)) {
    return { field, message: `${field} must be a number` }
  }
  if (options?.min !== undefined && value < options.min) {
    return { field, message: `${field} must be at least ${options.min}` }
  }
  if (options?.max !== undefined && value > options.max) {
    return { field, message: `${field} must be at most ${options.max}` }
  }
  return null
}

export function validateEnum(value: string, field: string, allowedValues: string[]): ValidationError | null {
  if (!allowedValues.includes(value)) {
    return { field, message: `${field} must be one of: ${allowedValues.join(', ')}` }
  }
  return null
}

export function validateString(value: any, field: string, options?: { minLength?: number; maxLength?: number }): ValidationError | null {
  if (typeof value !== 'string') {
    return { field, message: `${field} must be a string` }
  }
  if (options?.minLength && value.length < options.minLength) {
    return { field, message: `${field} must be at least ${options.minLength} characters` }
  }
  if (options?.maxLength && value.length > options.maxLength) {
    return { field, message: `${field} must be at most ${options.maxLength} characters` }
  }
  return null
}

export function validateSlug(slug: string): ValidationError | null {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) {
    return { field: 'slug', message: 'Slug must contain only lowercase letters, numbers, and hyphens' }
  }
  return null
}

export function handlePrismaError(error: any): { status: number; error: string; details?: string } {
  const code = error?.code
  const message = error?.message || ''

  // Unique constraint violation
  if (code === 'P2002') {
    const field = error.meta?.target?.[0] || 'field'
    return {
      status: 409,
      error: `${field} already exists`,
      details: `A record with this ${field} already exists`,
    }
  }

  // Foreign key constraint violation
  if (code === 'P2003') {
    return {
      status: 400,
      error: 'Invalid reference',
      details: 'One or more related records do not exist',
    }
  }

  // Record not found
  if (code === 'P2025') {
    return {
      status: 404,
      error: 'Record not found',
      details: 'The requested record could not be found',
    }
  }

  // Generic validation error
  if (code === 'P2006') {
    return {
      status: 400,
      error: 'Invalid value provided',
      details: message,
    }
  }

  // Database connection error
  if (code === 'P1002') {
    return {
      status: 503,
      error: 'Database unavailable',
      details: 'Cannot connect to database',
    }
  }

  // Generic error
  return {
    status: 500,
    error: 'Database error',
    details: process.env.NODE_ENV === 'development' ? message : undefined,
  }
}
