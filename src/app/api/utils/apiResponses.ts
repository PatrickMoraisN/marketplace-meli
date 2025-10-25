import { NextResponse } from 'next/server'

export function errorResponse(message: string, status: number, error?: unknown) {
  if (error) {
    console.error(`[API ERROR] ${message}`, error)
  }
  return NextResponse.json({ error: message }, { status })
}

export function successResponse<T>(data: T) {
  return NextResponse.json(data)
}
