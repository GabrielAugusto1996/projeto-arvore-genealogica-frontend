import { Injectable } from '@angular/core';
import { LocalUser } from 'src/app/dto/local.user.model';
import { STORAGE_KEYS } from 'src/app/configurations/storage_keys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        return user == null ? null : JSON.parse(user);
    }

    setLocalUser(obj: LocalUser) {

        if (obj == null) {
            this.removeLocalUser();
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    removeLocalUser() {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }
}
