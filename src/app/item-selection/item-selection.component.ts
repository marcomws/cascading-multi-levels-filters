import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-selection',
  templateUrl: './item-selection.component.html',
  styleUrls: ['./item-selection.component.scss']
})
export class ItemSelectionComponent implements OnInit {
  @Output() confirmation = new EventEmitter();
  hidden = true;

  constructor() {}

  ngOnInit() {}

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
  confirm() {
    this.confirmation.emit(true);
  }
}
