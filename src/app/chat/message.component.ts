import { Component, Output, EventEmitter, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Channel from '../../models/chat/channel';
import Message from '../../models/chat/message';
import User from '../../models/user';
     
@Component({
    selector: 'message-comp',
    templateUrl: './message.component.html',
    providers: []
})
export class MessageComponent implements OnInit { 
    constructor(){}
    @ViewChild('systemMessageTemplate') systemMessageTemplate: TemplateRef<any>;
    @ViewChild('receivedMessageTemplate') receivedMessageTemplate: TemplateRef<any>;
    @ViewChild('myMessagesTemplate') myMessagesTemplate: TemplateRef<any>;

    @Input() user: User;
    @Input() message: Message;

    isReceived: boolean;
    isServerMessage: boolean;

    ngOnInit(){
        if(this.message.user){
            this.isReceived = this.user.login != this.message.user.login;
        }else{
            this.isServerMessage = true;
        }
    }

    chooseTemplate(){
        if(this.isServerMessage){
            return this.systemMessageTemplate;
        }else{
            if(this.isReceived){
                return this.receivedMessageTemplate
            }
        }
        return this.myMessagesTemplate;
    }
}