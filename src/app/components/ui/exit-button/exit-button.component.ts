import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExitButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('container')
  public container!: ElementRef;

  @Input('left')
  public left: any;

  @Input('right')
  public right: any;

  @Input('bg')
  public bg: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.bg)
    {
      this.container.nativeElement.style.background = this.bg
    }
    if (this.left)
    {
      this.container.nativeElement.style.left = `${this.left}%`
    }
    else if (this.right)
    {
      this.container.nativeElement.style.right = `${this.right}%`
    }
  }

}
