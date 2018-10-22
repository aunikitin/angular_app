import { Component, Output, EventEmitter, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Channel from '../../models/chat/channel';
import Message from 'src/models/chat/message';
     
@Component({
    selector: 'conversation-comp',
    templateUrl: './conversation.component.html',
    providers: []
})
export class ConversationComponent implements OnInit{ 
    constructor(){}

    @ViewChild('emptyTemplate') emptyTemplate: TemplateRef<any>;
    @ViewChild('chatTemplate') chatTemplate: TemplateRef<any>;
    @ViewChild('withoutMessagesTemplate') withoutMessagesTemplate: TemplateRef<any>;

    @Output() needCreateNewRoom = new EventEmitter<boolean>(false);
    @Output() messageContent = new EventEmitter<string>();

    @Input() channel: Channel;
    @Input() channelName: string;
    @Input() messages: Message[];

    messageText: string;

    currentTemplate: TemplateRef<any>;

    ngOnInit(){
    }

    loadTemplate(){
        if(this.channelName != null && this.channelName !== undefined){
            if(this.messages){
                this.currentTemplate = this.chatTemplate;
                return this.chatTemplate;
            }else{
                this.currentTemplate = this.withoutMessagesTemplate;
                return this.withoutMessagesTemplate;
            }
        }else{
            this.currentTemplate = this.emptyTemplate;
            return this.emptyTemplate;
        }
    }

    createRoom(){
        this.needCreateNewRoom.emit(true);
    }

    sendMessage(){
        this.messageContent.emit(this.messageText);
        this.messageText = null;
        if(this.currentTemplate === this.withoutMessagesTemplate){
            this.loadTemplate();
        }
    }
}