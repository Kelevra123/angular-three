import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faLinkedin, faTelegram, faVk } from "@fortawesome/free-brands-svg-icons";

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

  constructor() { }

  ngOnInit(): void {
  }

}
