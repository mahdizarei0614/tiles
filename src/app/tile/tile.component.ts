import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {TilesContainerComponent} from "../tiles-container/tiles-container.component";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent extends TilesContainerComponent implements OnChanges {
  cdr = inject(ChangeDetectorRef)
  @Input() rows!: number;
  @Input() cols!: number;
  @HostBinding('class') get tileHostClasses() {
    return 'tile-enter bg-white rounded-xl shadow-lg !gap-0 !flex';
  }
  @HostBinding('style.gridColumn') get gridColumn() {
    return 'span ' + this.cols + ' / span ' + this.cols
  }
  @HostBinding('style.gridRow') get gridRow() {
    return 'span ' + this.rows + ' / span ' + this.rows
  }
  @HostBinding('style.height.rem') get height() {
    // console.log(this.currentBreakpointContainerWidth / 16)
    // console.log(this.paddingInRem * 2)
    // console.log(this.gapInRem * (this.countOfCols - 1))
    // console.log(((this.currentBreakpointContainerWidth / 16) - (this.paddingInRem * 2 + this.gapInRem * (this.countOfCols - 1))) / this.countOfCols)
    // console.log(this.gapInRem * (this.rows - 1))
    // console.log(((this.currentBreakpointContainerWidth / 16) - (this.paddingInRem * 2 + this.gapInRem * (this.countOfCols - 1))) / this.countOfCols * this.rows + (this.gapInRem * (this.rows - 1)))
    return this.availableSpace / this.countOfCols * this.rows + (this.gapInRem * (this.rows - 1));
  }
  @HostBinding('style.width.rem') get width() {
    return this.availableSpace / this.countOfCols * this.cols + (this.gapInRem * (this.cols - 1));
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}
