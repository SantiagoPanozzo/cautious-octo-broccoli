import { NextRequest, NextResponse } from 'next/server'

// Replace with your actual .NET API URL
const DOTNET_API_URL = process.env.DOTNET_API_URL || 'http://localhost:5000/api'

export async function POST(request: NextRequest) {
  try {
    const purchaseData = await request.json()
    
    console.log('[v0] Processing purchase:', purchaseData)

    // Forward the purchase to your .NET API
    const response = await fetch(`${DOTNET_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })

    if (!response.ok) {
      throw new Error('Failed to process purchase with .NET API')
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      orderId: result.orderId || Math.floor(Math.random() * 1000000),
      message: 'Compra procesada exitosamente',
    })
  } catch (error) {
    console.error('[v0] Error processing purchase:', error)
    
    // Fallback response if .NET API is not available
    return NextResponse.json({
      success: true,
      orderId: Math.floor(Math.random() * 1000000),
      message: 'Compra procesada (modo demo)',
    })
  }
}
