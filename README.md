
## **react-ai-intent**

react-ai-intent is a React hook library that allows you to detect user intent from text using OpenAI GPT or Google Gemini models. It helps integrate AI-powered intent detection into your React applications.

## **Features**
Detects user intent based on a list of actions.
Works with OpenAI GPT and Google Gemini models.
Easy to use React hook.
Supports customizable settings like temperature and model.
Designed to be used with React (compatible with versions 17+).


## **Installation** 

You can install the library via npm or yarn.
Using npm: npm install react-ai-intent
Using yarn: yarn add react-ai-intent


## **Usage**

### **Basic Usage**
To start using the useAIIntent hook, simply import it and pass the required parameters.

```javascript
import React, { useState } from 'react';
import { useAIIntent } from 'react-ai-intent';

const actions = ['search', 'contact', 'feedback'];

const App = () => {
  const [input, setInput] = useState('');
  const { intent, isLoading, error } = useAIIntent(input, {
    actions,
    apiKey: 'your-openai-api-key-here', // Replace with your actual API key
  });

  return (
    <div style={{ padding: 24 }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <p>{isLoading ? 'Detecting...' : intent ? `Intent: ${intent}` : 'No intent yet'}</p>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
};

export default App;
```



## **Parameters for useAIIntent** 
The useAIIntent hook takes two parameters:
input (string): The text input you want to analyze.
options (object): The options object contains:
actions (Array): The list of possible actions that the AI model will match to.
apiKey (string): Your OpenAI API key or Google Gemini API key. Required.
provider (string): The AI provider to use. Options: 'openai' (default) or 'gemini'.
model (string): The model to use. Defaults to "gpt-3.5-turbo" for OpenAI and "gemini-pro" for Gemini.
debounceMs (number): The debounce time in milliseconds (default: 300ms).
temperature (number): The temperature for generating responses (default: 0.2).


## **Example with Google Gemini** 
const { intent, isLoading, error } = useAIIntent(input, {
  actions,
  apiKey: 'your-gemini-api-key-here',
  provider: 'gemini',
});


## **API** 

### **useAIIntent** 
This hook accepts the following parameters and returns an object with the following values:
Parameters:
input (string): The user input you want to detect intent from.
options (object): Contains the following properties:
actions (Array<string>): The list of possible actions to detect.
apiKey (string): Your OpenAI or Gemini API key.
provider (string): Set the AI provider. Options: 'openai', 'gemini'. Default is 'openai'.
model (string): Model name, defaults to "gpt-3.5-turbo" for OpenAI and "gemini-pro" for Gemini.
debounceMs (number): The debounce delay in milliseconds (default: 300).
temperature (number): The creativity of the response (default: 0.2).


### **Returns**
intent (string | null): The matched intent based on the user's input.
isLoading (boolean): Whether the intent detection is in progress.
error (Error | null): Any errors that occurred during the request.


### **Example Output**
{
  intent: "search",  // The matched intent
  isLoading: false,  // Whether the model is loading the results
  error: null        // Any errors that occurred
}


## **Requirements**
React 17 or higher.
API keys for OpenAI or Google Gemini.


## **Contributing**
Feel free to open an issue or pull request if you would like to contribute to this project. Contributions are always welcome!
