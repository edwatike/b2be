import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID
  
  if (!clientId) {
    return NextResponse.json(
      { error: 'GITHUB_CLIENT_ID is not configured' },
      { status: 500 }
    )
  }

  // Получаем origin для callback URL
  const origin = request.headers.get('origin') || request.headers.get('referer') || 'http://localhost:3000'
  const callbackUrl = `${origin}/api/github/callback`
  
  // GitHub OAuth URL
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', callbackUrl)
  authUrl.searchParams.set('scope', 'user:email')
  authUrl.searchParams.set('state', Math.random().toString(36).substring(7))

  return NextResponse.redirect(authUrl.toString())
}
