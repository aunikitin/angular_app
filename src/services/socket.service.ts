
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import Message from '../models/chat/message';
import { Event } from '../models/chat/event';
import { AuthService } from './auth.service';

import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
    constructor(private authService: AuthService){}

    private socket;

    public initSocket(): void {
        this.socket = io(SERVER_URL);
    }

    public send(message: Message): void {
        const messagePackage = {
            'message': message,
            'x-access-token': this.authService.getToken()
        };
        this.socket.emit('message', messagePackage);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => {
                observer.next(data);
            });
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}