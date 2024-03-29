import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});


const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5,
      presence_penalty: 0, 
    });


    
    // Higher values means the model will take more risks. -> temperature

    // max_tokens->// The maximum number of tokens to generate in the completion. 
    // Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
    
    // frequency penalty-> // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, 
    // decreasing the model's likelihood to repeat the same line verbatim.
    
    // top_p->// alternative to sampling with temperature, called nucleus sampling

    // presence_penalty ->// Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, 
    // increasing the model's likelihood to talk about new topics.
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('Ask me  server started on http://localhost:5000'))