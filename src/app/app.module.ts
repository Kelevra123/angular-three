import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { TableCanvasComponent } from './components/canvas-members/table-canvas/table-canvas.component';
import { LoadingService } from "./loading.service";
import { SceneService } from "./scene.service";
import { WallsCanvasComponent } from './components/canvas-members/walls-canvas/walls-canvas.component';
import { CurtainsCanvasComponent } from './components/canvas-members/curtains-canvas/curtains-canvas.component';
import { ResizeService } from "./resize.service";
import { CameraControllerService } from "./cameraController.service";
import { ExitButtonComponent } from './components/ui/exit-button/exit-button.component';
import { ArrowsNavigationComponent } from './components/ui/arrows-navigation/arrows-navigation.component';
import { BottomTopNavigationComponent } from './components/ui/bottom-top-navigation/bottom-top-navigation.component';
import { HoverEffectButtonComponent } from './components/ui/hover-effect-button/hover-effect-button.component';
import { SocialComponent } from './components/ui/social/social.component';
import { WorkComponent } from './components/work/work.component';
import { CardComponent } from './components/work/card/card.component';
import { StackComponent } from './components/stack/stack.component';
import { SliderComponent } from './components/stack/slider/slider.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortCardComponent } from './components/portfolio/port-card/port-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    HeaderComponent,
    AboutComponent,
    TableCanvasComponent,
    WallsCanvasComponent,
    CurtainsCanvasComponent,
    ExitButtonComponent,
    ArrowsNavigationComponent,
    BottomTopNavigationComponent,
    HoverEffectButtonComponent,
    SocialComponent,
    WorkComponent,
    CardComponent,
    StackComponent,
    SliderComponent,
    PortfolioComponent,
    PortCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [LoadingService, SceneService, ResizeService, CameraControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
