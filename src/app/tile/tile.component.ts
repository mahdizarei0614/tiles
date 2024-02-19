import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input
} from '@angular/core';
import {TilesContainerComponent} from "../tiles-container/tiles-container.component";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  cdr = inject(ChangeDetectorRef)
  @Input() rows!: number;
  @Input() cols!: number;
  @Input() parentCols!: number;
  @Input() parentGap!: number;
  @Input() parentPadding!: number;
  @Input() parentWidth!: number;

  @HostBinding('class') get tileHostClasses() {
    return 'tile-enter bg-white rounded-xl !gap-0 w-full';
  }

  @HostBinding('style.gridColumn') get gridColumn() {
    return 'span ' + this.cols + ' / span ' + this.cols
  }

  @HostBinding('style.gridRow') get gridRow() {
    return 'span ' + this.rows + ' / span ' + this.rows
  }
  @HostBinding('style.height.rem') get height() {
    return ((this.parentWidth / 16) - (this.parentPadding * 2 + this.parentGap * (this.parentCols - 1))) / this.parentCols * this.rows + (this.parentGap * (this.rows - 1));
  }
}
