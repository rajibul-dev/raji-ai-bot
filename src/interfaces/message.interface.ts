interface Message {
  from: string;
  from_id: number | string;
  message: string;
  replied_to_message: Message | null;
}
