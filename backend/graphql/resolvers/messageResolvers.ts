import { Model, Sequelize } from "sequelize";
import { Channel } from "../../db/models/Channel.js";
import UserChannel from "../../db/models/UserChannel.js";
import Message from "../../db/models/Message.js";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

interface Channel extends Model {
    id: Number,
}

export const messageResolvers = {
    Query: {
        getMessages: async (_, args) => {
            return await Message.findAll({
                where: {
                  channelId: args.channelId,
                },
            });
        }, 
        getChannels: async (_, args) => {
            const userChannels = await UserChannel.findAll({
                where: {
                    userId: args.userID
                }
            });

            const channelIds = userChannels.map(userChannel => userChannel.channelId);
        
            const channels = await Channel.findAll({
                where: {
                    id: channelIds
                }
            });
        
            return channels;
        }
    },
    Mutation: {
        sendMessage: async (_, { text, senderId, recipientId }) => {
            const userChannels = await UserChannel.findAll({
                where: { userId: [senderId, recipientId] },
                attributes: ['channelId'],
                group: ['channelId'],
                having: Sequelize.where(Sequelize.fn('COUNT', 'channelId'), '=', 2)
            });
        
            const channelId = userChannels[0].channelId;

            const message = await Message.create({
                message: text,
                senderId,
                receiverId: recipientId,
                channelId
            });
        
            pubsub.publish(`MESSAGE_SENT_${channelId}`, { messageSent: message });

            return message;
        },        
        createChannel: async (_, { userIds }) => {
            const existingChannels = await UserChannel.findAll({
                where: { userId: userIds },
                attributes: ['channelId'],
                group: ['channelId'],
                having: Sequelize.where(Sequelize.fn('COUNT', 'channelId'), '=', userIds.length)
            });
        
            if (existingChannels.length > 0) {
                return Channel.findByPk(existingChannels[0].channelId);
            }

            const channel = await Channel.create({
                channelName: JSON.stringify(userIds)
            }) as Channel;
            
            await Promise.all(userIds.map(userId => UserChannel.create({ userId, channelId: channel.id })));
            
            return channel;
        },
    },
    Subscription: {
        messageSent: {
            subscribe: (_, args) => {
                console.log(`MESSAGE_SENT_${args.channelId}`);
                return pubsub.asyncIterator(`MESSAGE_SENT_${args.channelId}`); 
            },
        }
    }
};