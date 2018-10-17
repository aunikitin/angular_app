import { Component, OnInit } from '@angular/core';

import { Action } from '../../models/chat/action';
import { Event } from '../../models/chat/event';
import Message from '../../models/chat/message';
import User from '../../models/user';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'chat-comp',
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
    action = Action;
    user: User;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;

    constructor(private socketService: SocketService) { }

    ngOnInit(): void {
        this.initIoConnection();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
        .subscribe((message: Message) => {
            this.messages.push(message);
        });

        this.socketService.onEvent(Event.CONNECT)
        .subscribe(() => {
            console.log('connected');
        });
        
        this.socketService.onEvent(Event.DISCONNECT)
        .subscribe(() => {
            console.log('disconnected');
        });
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.user,
            content: message
        });
        this.messageContent = null;
    }

    public sendNotification(params: any, action: Action): void {
        let message: Message;

        if (action === Action.JOINED) {
            message = {
                from: this.user,
                action: action
            }
        } else if (action === Action.RENAME) {
            message = {
                action: action,
                content: {
                username: this.user.login,
                previousUsername: params.previousUsername
                }
            };
        }

        this.socketService.send(message);
    }
}