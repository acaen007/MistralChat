// src/app/api/mistral/route.js
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
      max_tokens: 700,
      temperature: 0.7,
    };

    // Fetch from Mistral AI API
    const apiResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error('API Error:', responseData);
      return new Response(JSON.stringify({ error: responseData }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Correctly parse the assistant's reply
    const assistantReply = responseData.choices[0].message.content;

    return new Response(JSON.stringify({ reply: assistantReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch response from Mistral AI API' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
