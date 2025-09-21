import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number, resetTime: number }>()

function rateLimit(clientId: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(clientId)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientId, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .trim()
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting
    if (!rateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { name, email, company, message } = await req.json()

    // Enhanced validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 254 || message.length > 5000 || (company && company.length > 200)) {
      return new Response(
        JSON.stringify({ error: 'One or more fields exceed maximum length' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: company ? sanitizeInput(company) : '',
      message: sanitizeInput(message)
    }

    // Get SendGrid API key from environment
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured')
    }

    // Prepare secure email content
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
        </div>
        <div style="background: #fff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.5;">${sanitizedData.message}</p>
        </div>
        <hr style="border: none; height: 1px; background: #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 12px;">
          <strong>Sent from:</strong> Quanor contact form<br>
          <strong>Time:</strong> ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}<br>
          <strong>IP:</strong> ${clientIP}
        </p>
      </div>
    `

    // Send email via SendGrid
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: 'hello@quanor.com', name: 'Quanor Team' }],
          subject: `Contact Form: ${sanitizedData.name} from ${sanitizedData.company || 'Individual'}`
        }
      ],
      from: {
        email: 'noreply@quanor.com',
        name: 'Quanor Contact Form'
      },
      reply_to: {
        email: sanitizedData.email,
        name: sanitizedData.name
      },
      content: [
        {
          type: 'text/html',
          value: emailBody
        }
      ]
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SendGrid API error:', response.status, errorText)
      
      // Don't expose SendGrid errors to client
      throw new Error('Email service temporarily unavailable')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-contact-email function:', error)
    
    // Log detailed error for debugging but return generic message
    return new Response(
      JSON.stringify({ 
        error: 'Unable to send message at this time. Please try again or contact hello@quanor.com directly.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})