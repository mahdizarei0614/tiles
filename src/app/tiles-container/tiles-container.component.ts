import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TilesContainerComponent implements OnInit, AfterViewInit {
  @Input() paddingInRem: number = 0;
  @Input() gapInRem: number = 0;
  // @Input() tiles = [
  //   {cols: 1, rows: 1},
  //   {cols: 1, rows: 1},
  //   {cols: 2, rows: 1},
  //
  //   {cols: 1, rows: 1},
  //   {cols: 2, rows: 2},
  //   {cols: 2, rows: 1},
  //
  //   {cols: 2, rows: 2},
  //   {cols: 1, rows: 2},
  //   {cols: 1, rows: 1},
  //
  //   {cols: 1, rows: 1},
  //   {cols: 1, rows: 2},
  //   {cols: 2, rows: 1},
  //
  //   {cols: 1, rows: 2},
  //   {cols: 1, rows: 1},
  //   {cols: 2, rows: 2},
  //
  //   {cols: 2, rows: 1},
  //   {cols: 2, rows: 2},
  //   {cols: 2, rows: 1},
  //
  //   {cols: 2, rows: 1},
  //   {cols: 1, rows: 1},
  //   {cols: 2, rows: 1},
  //
  //   {cols: 2, rows: 1},
  //   {cols: 2, rows: 1},
  //   {cols: 1, rows: 1},
  // ]
  @Input() tiles = Array(31).fill(null).map(i => ({cols: 1, rows: 1, tile: false, tile2: false, order: {sm: 0, md: 0, lg: 0, xl: 0, xxl:0, xxxl: 0, xxxxl: 0}}))
  @HostListener('window:resize', ['$event'])
  onResize() {
    this._currentBreakpointContainerWidth();
  }

  breakPoints = {
    'sm': [640, 640, 6],
    'md': [768, 640, 6],
    'lg': [1024, 992, 10],
    'xl': [1280, 1168, 12],
    '2xl': [1536, 1520, 16],
    '3xl': [1920, 1872, 20],
    '4xl': [2520, 2224, 24]
  }
  currentBreakpointContainerWidth = 0;
  currentBreakpoint = '';
  countOfCols = 12;

  ngOnInit() {
    this._currentBreakpointContainerWidth()
    this.tiles[0].tile = true;
    this.tiles[0].cols = 2;
    this.tiles[0].rows = 2;
    this.tiles[1].tile = true;
    this.tiles[1].cols = 2;
    this.tiles[1].rows = 2;
    this.tiles[13].tile2 = true;
    this.tiles[13].cols = 4;
    this.tiles[13].rows = 2;
    this.tiles[15].tile = true;
    this.tiles[15].cols = 2;
    this.tiles[15].rows = 2;
  }

  ngAfterViewInit() {
    this.sortable( document.getElementById('list'), function (){
      /* console.log(item); */
    });
  }

  _currentBreakpointContainerWidth() {
    const width = Math.max(
      document.documentElement["clientWidth"],
      document.body["scrollWidth"],
      document.documentElement["scrollWidth"],
      document.body["offsetWidth"],
      document.documentElement["offsetWidth"]
    )
    let current = [375, 352, 4];
    let currentBreakpoint: string = '';
    const breakPointsKeyValue = Object.entries(this.breakPoints);
    for (let i = 0; i < breakPointsKeyValue.length; i++) {
      if (width >= breakPointsKeyValue[i][1][0]) {
        current = breakPointsKeyValue[i][1];
        currentBreakpoint = breakPointsKeyValue[i][0];
      }
    }
    this.currentBreakpoint = currentBreakpoint;
    this.currentBreakpointContainerWidth = current[1];
    this.countOfCols = current[2];
  }

  check() {
    const t = this.tiles;
    const squares = t.map(tile => tile.rows * tile.cols).reduce((a, b) => a + b, 0);
    const is = Math.ceil(squares / this.countOfCols)
    const js = this.countOfCols;
    const matrix: number[][] = Array(is).fill(null).map(i => Array(js).fill(null));
    console.log(matrix)
    let count = 0
    for (let i = 0; i < is; i++) {
      for (let j = 0; j < js; j++) {
        count++;
        if (count > squares) break;
        if (!matrix[i]) {
          matrix[i] = []
        }
        matrix[i][j] = 0
      }
    }
  }
  sortable(section : any, onUpdate: any){
    let dragEl: any, nextEl: any, newPos: any, dragGhost: any;

    let oldPos = [...section.children].map(item => {
      item.draggable = true
      return document.getElementById(item.id)?.getBoundingClientRect();
    });

    function _onDragOver(e: any){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      var target = e.target;
      if( target && target !== dragEl){
        if(target.classList.contains('inside')) {
          e.stopPropagation();
        } else {
          //getBoundinClientRect contains location-info about the element (relative to the viewport)
          var targetPos = target.getBoundingClientRect();
          //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
          var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;
          section.insertBefore(dragEl, next && target.nextSibling || target);

          /*  console.log("oldPos:" + JSON.stringify(oldPos));
           console.log("newPos:" + JSON.stringify(newPos)); */
          /* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
          console.log(oldPos);
        }
      }
    }

    function _onDragEnd(evt: any){
      evt.preventDefault();
      newPos = [...section.children].map(child => {
        return document.getElementById(child.id)?.getBoundingClientRect();
      });
      console.log(newPos);
      dragEl.classList.remove('ghost');
      section.removeEventListener('dragover', _onDragOver, false);
      section.removeEventListener('dragend', _onDragEnd, false);

      nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
    }

    section.addEventListener('dragstart', function(e: any){
      dragEl = e.target;
      nextEl = dragEl.nextSibling;
      /* dragGhost = dragEl.cloneNode(true);
      dragGhost.classList.add('hidden-drag-ghost'); */

      /*  document.body.appendChild(dragGhost);
       e.dataTransfer.setDragImage(dragGhost, 0, 0); */

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', dragEl.textContent);

      section.addEventListener('dragover', _onDragOver, false);
      section.addEventListener('dragend', _onDragEnd, false);

      setTimeout(function (){
        dragEl.classList.add('ghost');
      }, 0)

    });
  }
}
