import { CredencialDTO } from './../../dto/credencial.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { LocalUser } from 'src/app/dto/local.user.model';
import { ApiConfig } from './../../configurations/api.config';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient, private storageService: StorageService) { }

    authenticate(creds: CredencialDTO) {
        return this.http.post(
            `${ApiConfig.BASE_URL}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    loginSucess(authorizationValue: string) {
        const token = authorizationValue.substring(7);
        const user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.removeLocalUser();
    }

}
