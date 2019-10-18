import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpinnerService } from "../spinner.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor() { }
}
