import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { faCircleLeft, faCircleRight, faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { LoadingService } from "../../../loading.service";
import { DeviceDetectorService } from "ngx-device-detector";


@Component({
  selector: '.slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit, AfterViewInit {
  public faCircleRight = faCircleRight;
  public faCircleLeft = faCircleLeft;
  public faPlayCircle = faPlayCircle;
  public faPauseCircle = faPauseCircle;

  public sliderSize: any;
  public slideSize:any;
  public animationDuration: any;
  public autoplayInterval:any;

  public slides: any;
  public slidesSize: number = 0;
  public descriptions: any;
  public currentAngle: number = 0;
  public slidesHolderItem: any;
  public stepAngle: any;
  public currentSlide = 0;
  public autoplay: any;
  public res: any = false;
  public windowWidth: number = 0;

  @ViewChild('wrapper')
  public wrapper: any;
  @ViewChild('circularSlider')
  public circularSlider: any;
  @ViewChild('descriptionsHolder')
  public descriptionsHolder: any;

  @ViewChild('slidesHolder')
  public slidesHolder: any;

  @ViewChild('btnLeft')
  public btnLeft: any;

  @ViewChild('btnAutoplay')
  public btnAutoplay: any;

  @ViewChild('btnRight')
  public btnRight: any;

  constructor(
    private _loadingService: LoadingService,
    private _deviceController: DeviceDetectorService
  ) {
    this._loadingService.setListener(this);
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
  }

  ngAfterViewInit(): void {
  }

  public onSceneLoad(isDesktop: boolean): void {
    this.slides = this.slidesHolder.nativeElement.children;
    this.descriptions = this.descriptionsHolder.nativeElement.children;
    this.stepAngle = 2*Math.PI / this.slides.length;
    if (this.windowWidth > 700) {
      this.slider(this.circularSlider.nativeElement, 2000, 15, 600, 5000)
    }
    else {
      this.slider(this.circularSlider.nativeElement, 2000, 15, 600, 5000)
    }
  }

  public startSetup( sliderSize: any, slideSize: any, animationDuration:any, autoplayInterval: any ) {

    this.sliderSize        = parseFloat( sliderSize )/100;
    this.slideSize         = parseFloat( slideSize )/100;
    this.animationDuration = parseFloat( animationDuration );
    this.autoplayInterval  = parseFloat( autoplayInterval );
    this.onResize();

  };
  //
public slider( newSlider: any, sliderSize: number, slideSize: number, animationDuration: number, autoplayInterval: number ) {


    this.startSetup(sliderSize, slideSize, animationDuration, autoplayInterval)
    this.slidesHolder.nativeElement.style.transitionDuration = this.animationDuration + 'ms';
    this.setAutoplay();
    this.setNav();
    this.addStyle();
    this.resetNavs()

    let _this = this;
    this.btnAutoplay.nativeElement.onclick = function() {

      if( this.classList.contains( 'controls__autoplay_running' ) ) {

        this.classList.remove( 'controls__autoplay_running' );
        this.classList.add( 'controls__autoplay_paused' );
        clearInterval( _this.autoplay );
        _this.autoplay = null;

      } else {

        this.classList.remove( 'controls__autoplay_paused' );
        this.classList.add( 'controls__autoplay_running' );
        _this.setAutoplay();

      }

    }
  };

  onResize(force?: any) {
      let radius,
        w = this.wrapper.nativeElement.parentNode.getBoundingClientRect().width,
        h = this.wrapper.nativeElement.parentNode.getBoundingClientRect().height;

      2*h <= w ? radius = h*this.sliderSize
        : radius = ( w/2 )*this.sliderSize;

      this.setSize( Math.round( radius ) );
  };

  setSize( radius: any ) {

    this.wrapper.nativeElement.style.width  = 2*radius + 'px';
    this.wrapper.nativeElement.style.height = radius + 'px';

    let r                         = 2*radius*( 1 - this.slideSize );
    this.slidesHolder.nativeElement.style.width = this.slidesHolder.nativeElement.style.height = r + 'px';
    this.slidesRepositioning( r/2 );

    this.slidesHolder.nativeElement.style.marginTop    = radius*this.slideSize + 'px';
    this.descriptionsHolder.nativeElement.style.width  = ( r/2 - r*this.slideSize + 20)*2 + 'px';
    this.descriptionsHolder.nativeElement.style.height = r/2 - r*this.slideSize + 20 + 'px';

    this.slidesSize                        = Math.min( 2*radius*this.slideSize, this.stepAngle*radius*( 1 - this.slideSize ) - 50 );
    // this.descriptionsHolder.nativeElement.style.fontSize = window.innerHeight < window.innerWidth ? '1.2vh'
    //   :  '1.2vw';
    for( let i = 0; i < this.slides.length; i++ ) {
      this.slides[i].style.width = this.slides[i].style.height = this.slidesSize + 'px';
    };

  };

  slidesRepositioning( r:any ) {

    for( let i = 0; i < this.slides.length; i++ ) {

      let x = r*Math.cos( this.stepAngle*i - Math.PI/2 ),
        y = r*Math.sin( this.stepAngle*i - Math.PI/2 );
      this.slides[i].style.transform = 'translate( ' + x  + 'px, ' + y + 'px ) rotate( ' + this.stepAngle*180/Math.PI*i + 'deg )';

    };

  };

  rotate( multiplier: any ) {

    let _this = this;

    this.removeStyle();
    this.resetNavs();

    if( this.currentSlide === this.slides.length - 1  && multiplier === -1 ) {

      this.slidesHolder.nativeElement.style.transform     = 'rotate( -360deg )';
      this.currentSlide = this.currentAngle = 0;
      this.addStyle();

      setTimeout( function(){

        _this.slidesHolder.nativeElement.style.transitionDuration = 0 + 's';
        _this.slidesHolder.nativeElement.style.transform          = 'rotate( ' + _this.currentAngle + 'deg )';
        setTimeout( function() { _this.slidesHolder.nativeElement.style.transitionDuration = _this.animationDuration + 'ms'; }, 20 );

      }, this.animationDuration );

    } else if ( this.currentSlide === 0 && multiplier === 1 ) {

      this.slidesHolder.nativeElement.style.transform = 'rotate( ' + this.stepAngle*180/Math.PI + 'deg )';
      this.currentSlide                 = _this.slides.length - 1;
      this.currentAngle                 = -( 2*Math.PI - _this.stepAngle )*180/Math.PI;
      this.addStyle();

      setTimeout( function(){

        _this.slidesHolder.nativeElement.style.transitionDuration = 0 + 's';
        _this.slidesHolder.nativeElement.style.transform = 'rotate( ' + _this.currentAngle + 'deg )';
        setTimeout( function() { _this.slidesHolder.nativeElement.style.transitionDuration = _this.animationDuration + 'ms'; }, 20 );

      }, this.animationDuration );

    } else {

      this.currentSlide                -= multiplier;
      this.currentAngle                += ( this.stepAngle*180/Math.PI )*multiplier;
      this.slidesHolder.nativeElement.style.transform = 'rotate( ' + this.currentAngle + 'deg )';
      this.addStyle();

    };

  };

  setNav() {

    let _this              = this;
    _this.btnLeft.nativeElement.onclick  = function() { _this.rotate(1) };
    _this.btnRight.nativeElement.onclick = function() { _this.rotate(-1) };

  };

  disableNav() {

    this.btnLeft.nativeElement.onclick  = null;
    this.btnRight.nativeElement.onclick = null;

  };

  setAutoplay() {
    let _this     = this;
    this.autoplay = setInterval( function() { _this.rotate(-1) }, _this.autoplayInterval + 20 );
  };

  removeStyle() {

    let x = this.currentSlide;

    this.descriptions[x].classList.remove( 'descriptions__item_visible' );
    this.slides[x].classList.remove( 'slides-holder__item_active' );
    this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 'px';

  };

  addStyle() {

    let x = this.currentSlide;

    this.descriptions[x].classList.add( 'descriptions__item_visible' );
    this.slides[x].classList.add( 'slides-holder__item_active' );
    this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 20 + 'px';

  };

  resetNavs() {

    let _this = this;

    this.disableNav();
    setTimeout( function(){ _this.setNav() }, this.animationDuration + 20 );
    if ( this.autoplay != null ) {
      clearInterval( this.autoplay );
      this.setAutoplay();
    };

  };


}
