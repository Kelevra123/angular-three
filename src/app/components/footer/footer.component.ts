import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faGithub, faLinkedin, faTelegram, faVk } from "@fortawesome/free-brands-svg-icons";
import { DisplayControllerService } from "../../displayController.service";

@Component({
  selector: '.footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  public faGit = faGithub
  public faTelegram = faTelegram;
  public faVk = faVk
  public faLinkedIn = faLinkedin

  public isThree: boolean = false;

  constructor(
    private _displayController: DisplayControllerService
  ) {
    this._displayController.addListener(this)
  }

  ngOnInit(): void {
  }

  public onThreeStart(isThree: boolean): void {
    this.isThree = isThree;
  }

}
