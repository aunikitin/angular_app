import Channel from "./channel";
import User from "../user";
import { Action } from "./action";

export default class Message {
    id?: any;
    text: string;
    channel: Channel;
    user: User;
    action?: Action;
    // Timestamps
    updatedAt?: Date;
    createdAt?: Date;
}