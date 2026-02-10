import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  
  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=github_oauth_failed', request.url)
    )
  }

  try {
    // Обмениваем код на access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code: code,
        redirect_uri: `${request.nextUrl.origin}/api/github/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Получаем информацию о пользователе
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()
    
    if (!userResponse.ok) {
      throw new Error('Failed to get user data')
    }

    // Получаем email если не публичный
    let email = userData.email
    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `token ${tokenData.access_token}`,
        },
      })
      
      if (emailsResponse.ok) {
        const emails = await emailsResponse.json()
        const primaryEmail = emails.find((e: any) => e.primary)
        email = primaryEmail?.email
      }
    }

    if (!email) {
      throw new Error('Email is required')
    }

    // Отправляем данные на backend для авторизации
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const authResponse = await fetch(`${backendUrl}/api/auth/github-oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        email: email,
        github_id: userData.id,
        username: userData.login,
      }),
    })

    if (!authResponse.ok) {
      throw new Error('Backend authentication failed')
    }

    const authData = await authResponse.json()
    
    // Устанавливаем cookie с токеном
    const response = NextResponse.redirect(new URL('/moderator', request.url))
    
    response.cookies.set('auth_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    })

    return response

  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.redirect(
      new URL('/login?error=github_oauth_failed', request.url)
    )
  }
}
