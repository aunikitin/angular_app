import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import Channel from '../../models/chat/channel';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { FormControl } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';
     
@Component({
    selector: 'newchannel-comp',
    templateUrl: './newChannel.component.html',
    providers: [UserService, ChannelService]
})
export class NewChannelComponent implements OnInit { 
    constructor(public dialogRef: MatDialogRef<NewChannelComponent>, 
        private userService: UserService,
        private channelService: ChannelService){}
    
    channel: Channel = new Channel();
    users: User[];
    selectedUsers = new FormControl();

    ngOnInit(){
        this.userService.getUsers(null, 0, null).subscribe((data: {count: number, rows: User[]}) => {
            this.users = data.rows;
        },
        err => console.log(err));
    }

    save(){
        this.channelService.addChannel(this.channel).subscribe(() => {
            this.dialogRef.close();
        },
        err => {
            console.log(err);
        });
    }

    close(){
        this.channel = new Channel();
        this.dialogRef.close();
    }
}