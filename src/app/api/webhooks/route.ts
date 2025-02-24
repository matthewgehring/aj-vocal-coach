import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Create email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (!endpointSecret) throw new Error('Missing endpoint secret');
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Get customer details
      const customerEmail = session.customer_details?.email || '';
      const customerName = session.customer_details?.name || 'Customer';

      // Get the purchased item details
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const purchasedItem = lineItems.data[0];

      // Send confirmation email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER as string,
          to: customerEmail,
          cc: 'ashleigh.dowler@hotmail.co.uk',
          subject: 'Thank you for your purchase!',
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>Dear ${customerName},</p>
            <p>Thank you for purchasing ${purchasedItem.description}. Here are your order details:</p>
            <ul>
              <li>Item: ${purchasedItem.description}</li>
              <li>Amount: £${(purchasedItem.amount_total! / 100).toFixed(2)}</li>
            </ul>
            <p>Next steps:</p>
            <ol>
              <li>Book your session using the Calendly link: 
                <a href="https://calendly.com/vocalcoachashleigh">https://calendly.com/vocalcoachashleigh</a>
              </li>
              <li>If you have any questions, please contact Ashleigh at ashleigh.dowler@hotmail.co.uk</li>
            </ol>
            <p>Best regards,<br>Ashleigh D Voice Coaching</p>
          `
        });
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
      break;
    }
    // Add other event types as needed
  }

  return NextResponse.json({ received: true });
} 