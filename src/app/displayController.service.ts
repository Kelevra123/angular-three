import { Injectable } from "@angular/core";

@Injectable()
export class DisplayControllerService {
  private listeners: Array<any> = [];

  public addListener(listener: any) {
    this.listeners.push(listener)
  }

  public startThreeExp(): void {
    this.listeners.forEach(listener => listener.onThreeStart(true))
  }

  public endThreeExp(): void {
    this.listeners.forEach(listener => listener.onThreeStart(false))
  }

}
