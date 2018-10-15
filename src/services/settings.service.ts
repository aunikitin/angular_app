import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SettingsService{
    constructor(){}

    defaultPagingOptions = {
        available:[5,10,15,20],
        limit:15
    }
}