import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {currencyCode} from '../../constants/currency.const';

@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit {
  @Input() purchase: Purchase;
  @Input() isOpen: boolean;
  @Input() isCommentExist: boolean;
  @Output() previewClick = new EventEmitter();

  currencyCode = currencyCode;

  constructor() {
  }

  ngOnInit() {
    this.isOpen = false;
    this.isCommentExist = (this.purchase.comment === null || this.purchase.comment === '') ? false : true;
  }

  onClick() {
    this.previewClick.emit();
  }
}
