import { RegisterCommandsGlobalActionContext } from "gadget-server";
import { getRPSChoices } from '../../game';
import { getGifCategories } from '../../gifs';
import { capitalize, InstallGlobalCommands } from '../../utils';

/**
 * @param { RegisterCommandsGlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  try {
    logger.info({ commands: ALL_COMMANDS }, 'Registering commands with Discord');
    const result = await InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
    logger.info({ result }, 'Commands registered successfully');
    return { success: true, result };
  } catch (error) {
    logger.error({ error }, 'Failed to register commands');
    throw error;
  }
};

function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

function createGifCategoryChoices() {
  const categories = getGifCategories();
  const categoryChoices = [];

  for (let category of categories) {
    categoryChoices.push({
      name: capitalize(category),
      value: category.toLowerCase(),
    });
  }

  return categoryChoices;
}

// Simple test command
export const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,  
};

export const TTS_COMMAND = {
  name: 'say',
  description: 'Prompt your TTS.',
  options: [
    {
      type: 3, // STRING
      name: 'prompt',
      description: 'What do you want me to say?',
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};


// Command containing options
export const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,  
};

export const HAPPY_COMMAND = {
  name: 'happy',
  description: 'Send a happy GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const SAD_COMMAND = {
  name: 'sad',
  description: 'Send a sad GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const KISS_COMMAND = {
  name: 'kiss',
  description: 'Send a kiss GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const HUGPAT_COMMAND = {
  name: 'hugpat',
  description: 'Send a hug or pat GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const YANDERE_COMMAND = {
  name: 'yandere',
  description: 'Send a sad GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const SMUG_COMMAND = {
  name: 'smug',
  description: 'Send a sad GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const SLEEP_COMMAND = {
  name: 'sleep',
  description: 'Send a sad GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const ANGRY_COMMAND = {
  name: 'angry',
  description: 'Send a sad GIF',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

export const GM_COMMAND = {
  name: 'gm',
  description: 'Good morning! Send a motivational video',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  dm_permission: true,
};

const ALL_COMMANDS = [TEST_COMMAND, TTS_COMMAND, CHALLENGE_COMMAND, HAPPY_COMMAND, SAD_COMMAND, KISS_COMMAND, HUGPAT_COMMAND, YANDERE_COMMAND, SMUG_COMMAND, SLEEP_COMMAND, ANGRY_COMMAND, GM_COMMAND];


export const options = { triggers: { api: true } }