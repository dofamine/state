import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from "../spinner.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() url;
  @Input() i: number;
  spinnerId: string;
  textId: string;

  constructor(private readonly spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerId = this.spinnerService.generateId();
    this.textId = this.spinnerService.generateId();
    this.spinnerService.roll([this.spinnerId, this.textId]);
    setTimeout(() => this.spinnerService.stop([this.spinnerId, this.textId]), 700 * this.i);
  }

  stop() {
    this.spinnerService.stop(this.spinnerId);
  }

  on() {
    this.spinnerService.roll(this.spinnerId);
  }
}
