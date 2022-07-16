import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.curtains-canvas',
  templateUrl: './curtains-canvas.component.html',
  styleUrls: ['./curtains-canvas.component.scss']
})
export class CurtainsCanvasComponent implements OnInit {
  //Path
  private frontWallTexturePath: string = '../../assets/walls/frontWalls.jpg';
  private frontWallGLFTPath: string = '../../assets/walls/frontWall.glb';

  constructor() { }

  ngOnInit(): void {
  }

}
