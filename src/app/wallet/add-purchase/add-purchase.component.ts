import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  form: FormGroup;
  @Input() existTitleError = false;
  @Input() textTitleError: string;
  @Input() existPriceError = false;
  @Input() textPriceError: string;
  @Output() addPurchase = new EventEmitter<Purchase>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.max(1000000), Validators.min(10), Validators.pattern(/^-?\d*(\.\d+)?$/)]],
      date: [''],
      comment: ['']
    });

    // this.form.valueChanges.subscribe(it => console.log(this.form.controls.title));
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);

    if (this.form.invalid) {
      return;
    }

    const purchase: Purchase = {
      title: this.form.value.title,
      price: Math.trunc(price * 100) / 100,
      date: this.form.value.date === '' ? new Date() : new Date(this.form.value.date),
      comment: this.form.value.comment
    };

    this.addPurchase.emit(purchase);
  }
}
