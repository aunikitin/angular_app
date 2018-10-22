import Message from './message';
import Vulnerability from '../vulnerability';
import User from '../user';

export default class Channel {
    id: number;
    messages: Message[];
    name: string;
    vulnerability: Vulnerability;
    users: User[];
}