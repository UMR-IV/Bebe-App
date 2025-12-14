import { Blob } from 'buffer'; 
import { RouteContext } from "gadget-server";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { getRandomEmoji, DiscordRequest } from '../../utils';
import { getShuffledOptions, getResult } from '../../game';
import { getRandomGif, getGifCategories } from '../../gifs';

/**
 * Route handler for POST interactions
 *
 * @param { RouteContext } route context - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 *
 */
export default async function route({ request, reply, api, logger, connections }) {
  // Interaction type and data
  const { type, id, data, member, token, message } = request.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return reply.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }
    // "challenge" command
    if (name === 'challenge' && id) {
      const userId = member.user.id;
      // User's object choice
      const objectName = data.options[0].value;

      // Create active game using message ID as the game ID
      await api.games.create({
        messageId: id,
        userId,
        objectName,
      });

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `Rock papers scissors challenge from <@${userId}>`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  // Append the game ID to use later on
                  custom_id: `accept_button_${id}`,
                  label: 'Accept',
                  style: ButtonStyleTypes.PRIMARY,
                },
              ],
            },
          ],
        },
      });
    }

    if (name === 'say') {
      const prompt = data.options[0].value;
      
      // Send immediate "thinking" response
      await reply.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      });
      
      try {
        const ttsUrl = `https://fastapi-tutorial-wm71.onrender.com/tts?text=${encodeURIComponent(prompt)}`;
        const res = await fetch(ttsUrl);
    
        if (!res.ok) {
          throw new Error('TTS request failed');
        }
    
        // Get the audio file as a buffer
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Create FormData to upload the file to Discord
        const form = new FormData();
        form.append('files[0]', new Blob([buffer], { type: 'audio/mpeg' }), 'tts.mp3');
        form.append('payload_json', JSON.stringify({
          content: `Here's your TTS: "${prompt}"`
        }));
        
        // Edit the deferred message with the audio file
        const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/@original`;
        const uploadRes = await fetch(`https://discord.com/api/v10/${endpoint}`, {
          method: 'PATCH',
          body: form,
        });
    
        if (!uploadRes.ok) {
          throw new Error('Failed to upload audio to Discord');
        }
    
      } catch (err) {
        logger.error({ err }, 'TTS Error');
        // Edit the deferred message with error
        const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/@original`;
        await DiscordRequest(endpoint, {
          method: 'PATCH',
          body: {
            content: `TTS Failed! 😭 ${err.message}`,
          },
        });
      }
      return;

      //=========new.1
      //const prompt = data.options[0].value;
      
      // Send immediate "thinking" response
     // await reply.send({
       // type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      //});
      
      //try {
        //const res = await fetch("https://fastapi-tutorial-wm71.onrender.com/talk", {
        //  method: "POST",
        //  headers: { "Content-Type": "application/json" },
        //  body: JSON.stringify({ message: prompt })
       // });
    
       // const responseData = await res.json();
       // const { response: message, audio_url } = responseData;
        
        // Edit the deferred message with the actual response
        //const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/@original`;
       // await DiscordRequest(endpoint, {
        //  method: 'PATCH',
         // body: {
           // content: audio_url ? `Message: ${message}\n${audio_url}` : `Response: ${message}`,
         // },
        //});
    
      //} catch (err) {
        //logger.error({ err }, 'TTS Error');
        //const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/@original`;
        //await DiscordRequest(endpoint, {
          //method: 'PATCH',
          //body: {
            //content: `TTS Failed! 😭 ${err.message}`,
          //},
        //});
      //}
      //return;

      //=====================
      //const prompt = data.options[0].value;
      //const ttsUrl = `https://fastapi-tutorial-wm71.onrender.com/tts?text=${encodeURIComponent(prompt)}`;
    
      //const response = await fetch(ttsUrl);
      //const buffer = Buffer.from(await response.arrayBuffer());
    
      //const form = new FormData();
      //form.append('file', new Blob([buffer], { type: 'audio/mpeg' }), 'tts.mp3');
      //form.append('payload_json', JSON.stringify({
      //content: `Here's your TTS: "${prompt}"`
      //}));
    
      //await fetch(`https://discord.com/api/v10/webhooks/${process.env.APP_ID}/${token}`, {
        //method: 'POST',
        //body: form,
        //headers: form.getHeaders()
      //});
    
      // Return an empty ACK so Discord doesn't timeout
      //return reply.send({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: 'TTS sent!' } });
    }
    
    // "happy" command
    if (name === 'happy') {
      const categories = getGifCategories();
      const category = categories[0];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "sad" command
    if (name === 'sad') {
      const categories = getGifCategories();
      const category = categories[1];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "kiss" command
    if (name === 'kiss') {
      const categories = getGifCategories();
      const category = categories[2];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "hugpat" command
    if (name === 'hugpat') {
      const categories = getGifCategories();
      const category = categories[3];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "yandere" command
    if (name === 'yandere') {
      const categories = getGifCategories();
      const category = categories[4];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "smug" command
    if (name === 'smug') {
      const categories = getGifCategories();
      const category = categories[5];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "sleep" command
    if (name === 'sleep') {
      const categories = getGifCategories();
      const category = categories[6];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "angry" command
    if (name === 'angry') {
      const categories = getGifCategories();
      const category = categories[7];
      const gifUrl = getRandomGif(category);

      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${gifUrl}`,
        },
      });
    }

    // "gm" command
    if (name === 'gm') {
      const videoUrl =
        'https://cdn.discordapp.com/attachments/641538472771059722/1440469184499679262/Nanahira_good_morning_good_morning.mov?ex=691e44f8&is=691cf378&hm=65467ae16586266c034443511ef4edd204d80f9277fbc68a94400500d884dc8f&';
    
      return reply.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
      content: `${videoUrl}`,
    },
      });
    }
  }


  /**
   * Handle requests from interactive components
   * See https://discord.com/developers/docs/interactions/message-components#responding-to-a-component-interaction
   */
  if (type === InteractionType.MESSAGE_COMPONENT) {
    // custom_id set in payload when sending message component
    const componentId = data.custom_id;

    if (componentId.startsWith('accept_button_')) {
      // get the associated game ID
      const gameId = componentId.replace('accept_button_', '');
      // Delete message with token in request body
      const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/${message.id}`;
      try {
        await reply.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'What is your object of choice?',
            // Indicates it'll be an ephemeral message
            flags: InteractionResponseFlags.EPHEMERAL,
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.STRING_SELECT,
                    // Append game ID
                    custom_id: `select_choice_${gameId}`,
                    options: getShuffledOptions(),
                  },
                ],
              },
            ],
          },
        });
        // Delete previous message
        await DiscordRequest(endpoint, { method: 'DELETE' });
      } catch (err) {
        logger.error({ err }, 'Error sending message');
      }
      return;
    } else if (componentId.startsWith('select_choice_')) {
      // get the associated game ID
      const gameId = componentId.replace('select_choice_', '');
      const activeGame = await api.games.findFirst({
        filter: {
          messageId: {
            equals: gameId,
          },
        },
      });

      if (activeGame) {
        // Get user ID and object choice for responding user
        const userId = member.user.id;
        const objectName = data.values[0];
        // Calculate result from helper function
        const resultStr = getResult(activeGame, {
          userId,
          objectName,
        });

        // Remove game from storage
        await api.games.delete(activeGame.id)
        // Update message with token in request body
        const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/${message.id}`;

        try {
          // Send results
          await reply.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: resultStr },
          });
          // Update ephemeral message
          await DiscordRequest(endpoint, {
            method: 'PATCH',
            body: {
              content: 'Nice choice ' + getRandomEmoji(),
              components: [],
            },
          });
        } catch (err) {
          logger.error({ err }, 'Error sending message');
        }
        return;
      }
    }
  }
}
