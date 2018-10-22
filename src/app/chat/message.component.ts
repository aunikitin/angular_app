import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import Channel from '../../models/chat/channel';
import { ChannelService } from '../../services/channel.service';
     
@Component({
    selector: 'message-comp',
    templateUrl: './message .component.html',
    providers: [ChannelService]
})
export class MessageComponent implements OnInit { 
    constructor(private channelService: ChannelService){}

    @Input() channel: Channel;
    @Output() needUpdate = new EventEmitter<boolean>(false);
    @Output() channelToLoad = new EventEmitter<Channel>();

    chatName: string;
    lastMessage: string;
    messageTime: Date;
    chatTopic: string;

    ngOnInit(){
        this.chatName = this.channel.name;
        if(this.channel.vulnerability){
            this.chatTopic = this.channel.vulnerability.identifier;
        }
    }

    loadChannel(){
        this.channelToLoad.emit(this.channel);
    }

    deleteChannel(){
        this.channelService.deleteChannel(this.channel.id).subscribe(() => {
            this.needUpdate.emit(true);
        },
        err => console.log(err))
    }
}