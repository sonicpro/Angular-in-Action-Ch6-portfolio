import { Injectable } from '@angular/core';

// Allows to store object and array-like data in the local storage.
@Injectable()
export class LocalStorageService {
    public get(key: string, fallback: any) : any {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    }

    public set(key: string, value: any) : void {
        localStorage.setItem(key, JSON.stringify(value));
    } 
}
