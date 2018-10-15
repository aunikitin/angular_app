import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccessGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        if (!this.authService.haveAllRights()) {
            return true;
        }

        this.router.navigate(['/abracadabra']);
        return false;
    }
}