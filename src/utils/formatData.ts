import { readFileSync } from "fs";

export function formatChatExportedData(exportedFilePath: string) {
  const jsonString = readFileSync(exportedFilePath, "utf-8");
  const data = JSON.parse(jsonString);

  function findMessageFromID(
    id: string | number | undefined,
    messagesArr: any[]
  ): any | null {
    return id ? messagesArr.find((message) => message.id === id) || null : null;
  }

  function formatMessageText(
    textData: string | { text: string; type: string }[]
  ): string {
    if (typeof textData === "string") return textData;

    return textData
      .map((item) => {
        if (typeof item === "string") return item;
        return `${item.text}${
          item.type === "bot_command" ? " (bot command)" : ""
        }`;
      })
      .join("");
  }

  function modifyMessageObject(messageObject: any): any | null {
    if (!messageObject) return null;

    return {
      from: messageObject.from,
      from_id: messageObject.from_id?.slice(4) || "unknown", // slicing 'user' part
      message: formatMessageText(messageObject.text),
      replied_to_message: modifyMessageObject(
        findMessageFromID(messageObject.reply_to_message_id, data.messages)
      ),
    };
  }

  const formattedMessagesArr = data.messages
    .filter((message: any) => message.type === "message")
    .map(modifyMessageObject);

  return { ...data, messages: formattedMessagesArr };
}

// Test
const test = formatChatExportedData(
  "./src/chat-exports/experimental-group.json"
);
console.log(test);
