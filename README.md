# Mistral AI Chat Application

This project is a responsive chat application built using **Next.js** and **React**. It interacts with the **Mistral AI API** to provide real-time chat responses.

## Features

- **Real-Time Chat**: Communicate with the Mistral AI API to receive instant responses.
- **Model Selection**: Choose from different AI models to generate various response types.
- **Animated Typing Indicator**: An engaging typing animation for better user experience.
- **Responsive and Adjustable UI**: Resizable chat box with responsive design, allowing it to adapt to different screen sizes.

## Project Structure

├── src │ ├── app │ │ ├── components │ │ │ ├── ChatBox.js # Main chat component │ │ │ ├── TypingIndicator.js # Typing indicator with animation │ │ │ └── ... # Additional components │ │ ├── api │ │ │ └── mistral │ │ │ └── route.js # API route for Mistral AI interactions │ │ ├── globals.css # Global styles │ │ ├── layout.tsx # Layout configuration for Next.js │ │ └── page.tsx # Main page entry for the application ├── .env.local.example # Example environment variable file ├── README.md # Project documentation └── package.json # Project dependencies and scripts


## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

## Getting Started

1. **Clone the Repository**

    ```bash
    git clone https://github.com/acaen007/MistralChat
    cd mistral-chat-app
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Environment Variables**

    To use the Mistral AI API, you’ll need an API key. **Do not hard-code sensitive information like your API key directly into the code**. Instead, use environment variables to keep it secure.

    - Copy the example environment file and rename it to `.env.local`:

      ```bash
      cp .env.local.example .env.local
      ```

    - Open `.env.local` in a text editor and replace `your_mistral_api_key_here` with your actual **Mistral AI API key**:

      ```plaintext
      MISTRAL_API_KEY=your_mistral_api_key_here
      ```

    - **Important**: Ensure `.env.local` is in your `.gitignore` file to avoid accidentally committing your API key to version control.

4. **Run the Application**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

5. **Test the Chat Functionality**

    - Enter messages in the chat box to interact with the Mistral AI API.
    - Use the dropdown to select different models and see how the responses vary.


## Troubleshooting

- **API Key Issues**: Ensure your API key is correct and has the necessary permissions for the Mistral AI endpoints.

## License

This project is licensed under the MIT License.


