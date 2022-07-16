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

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    HeaderComponent,
    AboutComponent,
    TableCanvasComponent,
    WallsCanvasComponent,
    CurtainsCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LoadingService, SceneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
