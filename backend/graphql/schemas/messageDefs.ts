export const messageDefs = `#graphql
    type Message {
        id: ID!
        message: String!
        senderId: ID!
        receiverId: ID!
        channelId: ID!
    }

    type Channel {
        id: ID!
        channelName: String!
    }

    type Query {
        getChannels(userID: ID!): [Channel]
        getMessages(channelId: ID!): [Message]
    }

    type Mutation {
        sendMessage(text: String!, senderId: ID!, recipientId: ID!): Message
        createChannel(userIds: [ID!]!): Channel
    }

    type Subscription {
        messageSent(channelId: ID!): Message
    }
`;