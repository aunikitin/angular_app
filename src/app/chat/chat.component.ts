import { Component, OnInit } from '@angular/core';

import { Action } from '../../models/chat/action';
import { Event } from '../../models/chat/event';
import Message from '../../models/chat/message';
import User from '../../models/user';
import { SocketService } from '../../services/socket.service';
import Channel from '../../models/chat/channel';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewChannelComponent } from './newChannel.component';
import { AuthService } from '../../services/auth.service';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'chat-comp',
    templateUrl: './chat.component.html',
    providers: [AuthService, ChannelService, MessageService]
})
export class ChatComponent implements OnInit {
    action = Action;
    user: User;
    messages: Message[] = [];
    ioConnection: any;
    name: string;
    channelName: string;
    channel: Channel;
    channels: Channel[];

    constructor(private socketService: SocketService, 
        private matDialog: MatDialog, 
        private channelService: ChannelService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.initIoConnection();
        this.refresh();
    }

    openAddChannelDialog(){
        const dialogRef = this.matDialog.open(NewChannelComponent, {
            width: '500px',
            height: '500px'
        });
    
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    refresh(params?){
        let filterObject = null;
        if(params != null && params != undefined){
            filterObject = {
                name: params
            }
        }
        this.channelService.getChannels(filterObject).subscribe((data: {count: number, rows: Channel[]}) => {
            this.channels = data.rows;
        })
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
            user: this.user,
            text: message,
            channel: this.channel
        });
    }

    public openChannel(channel: Channel){
        this.channel = channel;
        this.messageService.getMessages(channel.id.toString()).subscribe((data: Message[]) => {
            this.messages = data;
            this.channelName = channel.name;
            this.sendNotification(null, Action.JOINED);
        })
    }

    public nameChanged(newName){
        this.refresh(newName);
    }

    public sendNotification(params: any, action: Action): void {
        let message: Message;

        if (action === Action.JOINED) {
            message = {
                user: this.user,
                action: action,
                text: 'this.user.login' + ' joined channel',
                channel: this.channel
            }
        } else if (action === Action.RENAME) {
            // message = {
            //     action: action,
            //     content: {
            //         username: this.user.login,
            //         previousUsername: params.previousUsername
            //     }
            // };
        }

        this.socketService.send(message);
    }
}