import promptSync from 'prompt-sync';

const prompt = promptSync();
const studyTopic = prompt('What do you want to study? ');
console.log(`You chose to study: ${studyTopic}`);


import OpenAI from "openai";
import fs from "fs";


const openai = new OpenAI({
  apiKey: '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',
});


async function contentGen() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "Make a list of clues and answers for a crossword about " + studyTopic + ". The format should be Answer - Clue."
        }
      ]
    });

    // Get content from API response
    const responseContent = completion.choices[0].message.content;

    // Write content to .txt file
    fs.writeFile("response.txt", responseContent, "utf8", (err) => {
      if (err) {
        console.error("Error while writing:", err);
      } else {
        console.log("response.txt is ready");
      }
    });
  } catch (error) {
    console.error("Error while fetching:", error);
  }
}

contentGen();
