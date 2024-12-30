interface SendFormRequest {
  name: string;
  phone: string;
  comment: string;
  referrer: string | undefined;
}

export async function POST(request: Request) {
  try {
    const { name, phone, comment, referrer }: SendFormRequest = await request.json();

    if (!phone) {
      return new Response(JSON.stringify({ success: false, message: 'phone is required' }), { status: 400 });
    }

    const chatId = process.env.SEND_FORM_TO_CHAT_ID;
    const botToken = process.env.SEND_FORM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    let text = '*New Message*\n\n';

    text += `*Phone*: ${phone}\n`;

    if (name) text += `*Name*: ${name}\n`;

    if (comment) text += `*Comment*: ${comment}\n`;

    if (referrer) text += `*Referrer*: ${referrer}\n`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: 'Markdown',
        text: text,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
  } catch (error) {
    const typedError = error as Error;

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server Error',
        error: typedError.message,
      }),
      { status: 500 }
    );
  }
}
