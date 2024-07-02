const fetch = require('node-fetch');

// Request to generate the speech inference
const inferenceResponse = await fetch('https://api.fakeyou.com/tts/inference', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tts_model_token: 'weight_dh8zry5bgkfm0z6nv3anqa9y5',
    uuid_idempotency_token: 'kljsadf9u234lkjsdflksdjf',
    inference_text:
      "I'll only say the things you want me to say, and nothing more.",
  }),
}).then((res) => res.json());

// Extract the inference job token from the response
const jobToken = inferenceResponse.inference_job_token;

// Wait for the completion of the inference job
const jobStatusResponse = await fetch(
  `https://api.fakeyou.com/tts/job/${jobToken}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then((res) => res.json());

// Extract the audio file path from the job status response
const audioPath =
  jobStatusResponse.models.state.maybe_public_bucket_wav_audio_path;

// Construct the full URL to the audio file
const audioUrl = `https://storage.googleapis.com/vocodes-public${audioPath}`;

console.log('Audio URL:', audioUrl);
