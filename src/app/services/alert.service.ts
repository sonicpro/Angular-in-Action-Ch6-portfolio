import { Injectable } from '@angular/core';

// This service supplies data for alert.component. The data is bound to clr-alert
// element properties and events. The element is the part of Clarity UI framework by VmWare.
@Injectable()
export class AlertService {
    private show: boolean = false; // This field is bound to *ngIf directive in the component.
    private type: string = "info";
    private message: string;
    private timer: any;

    public alert(message: string,
        type: string = "info",
        autohide: number = 5000) {
        this.show = true;
        this.type = type;
        this.message = message;
        if (this.timer) {
            clearInterval(this.timer);
        }

        if (autohide) {
            this.timer = setTimeout(() => this.close(), autohide);
        }
    }

    private close() {
        this.show = false;
    }
}
