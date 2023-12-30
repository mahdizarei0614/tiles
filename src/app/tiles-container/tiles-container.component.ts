import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilesContainerComponent implements OnChanges {
  @Input() countOfCols: number = 12;
  @Input() paddingInRem: number = 0;
  @Input() gapInRem: number = 0;
  availableSpace = 0;

  @HostBinding('class') get hostClasses() {
    return 'grid border border-red ' +
      'grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-12 ' +
      'gap-6 mx-auto bg-[#ddd]';
  }

  @HostBinding('style.width.rem') get getContainerWidth() {
    return this.containerWidth;
  }
  containerWidth = 0;
  breakPoints = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
    '3xl': 1920,
    '4xl': 2520,
    '5xl': 10000
  }

  ngOnChanges(changes: SimpleChanges) {
    this._calcCurrentBreakpointContainerWidth();
    console.log(changes)
  }

  private _calcCurrentBreakpointContainerWidth() {
    const width = Math.max(
      document.documentElement["clientWidth"],
      document.body["scrollWidth"],
      document.documentElement["scrollWidth"],
      document.body["offsetWidth"],
      document.documentElement["offsetWidth"]
    )
    let current = 375;
    const breakPointsKeyValue = Object.entries(this.breakPoints);
    for (let i = 0; i < breakPointsKeyValue.length; i++) {
      if (width >= breakPointsKeyValue[i][1]) {
        current = breakPointsKeyValue[i][1];
      }
    }
    this.containerWidth = current / 16;
    this.availableSpace = (current / 16) - (this.paddingInRem * 2 + this.gapInRem * (this.countOfCols - 1));
    console.log(this.paddingInRem)
    console.log(this.availableSpace)
  }
}
