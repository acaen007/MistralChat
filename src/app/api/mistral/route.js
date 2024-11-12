// src/app/api/mistral/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { messages, model } = await req.json();

    // Format messages as per Pixtral's expected structure
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: [{ type: 'text', text: msg.content }],
    }));

    const requestBody = {
      model: model,
      messages: formattedMessages,
      max_tokens: 300,
      temperature: 0.7,
    };

    // Log the request being sent
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
      }
    );

    // Log the response from the API
    console.log('API Response:', JSON.stringify(response.data, null, 2));

    // Correctly parse the assistant's reply
    const assistantReply = response.data.choices[0].message.content;

    return NextResponse.json({ reply: assistantReply }, { status: 200 });
  } catch (error) {
    // Log detailed error information
    console.error('API Error:', error.response ? error.response.data : error.message);

    return NextResponse.json(
      { error: 'Failed to fetch response from Mistral AI API' },
      { status: 500 }
    );
  }
}
