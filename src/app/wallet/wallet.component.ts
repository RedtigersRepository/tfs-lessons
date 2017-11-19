import {Component, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  purchases: Purchase[] = [];
  total = 0;
  isAddPurchaseOpen = false;
  cardButtonText = 'Добавить';

  private currentOpen: number;

  ngOnInit() {
    // this.purchases = this.getData();
    // this.total = this.getTotal();
    this.addPurchases(this.getData());
  }

  onAddPurchase(newPurchase: Purchase) {
    // this.purchases.unshift(newPurchase);
    // this.total = this.getTotal();
    this.addPurchases([newPurchase]);
    this.toggleAdd();
  }

  toggleAdd() {
    this.isAddPurchaseOpen = !this.isAddPurchaseOpen;
    this.cardButtonText = this.isAddPurchaseOpen ? 'Отменить' : 'Добавить';
  }

  onPreviewClick(index: number) {
    if (index === this.currentOpen) {
      this.currentOpen = null;
      return;
    }

    this.currentOpen = index;
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }

  private addPurchases(purchases: Purchase[]) {
    this.purchases = purchases.concat(this.purchases);
    this.total = this.getTotal();
  }

  private getData(): Purchase[] {
    return [
      {
        title: 'Проезд на метро',
        price: 1700,
        date: new Date(2017, 10, 3),
        comment: ''
      },
      {
        title: 'IPhone X 256gb',
        price: 91990,
        date: new Date(2017, 10, 3),
        comment: ''
      },
      {
        title: 'Лапша "Доширак"',
        price: 40,
        date: new Date(2017, 10, 3),
        comment: ''
      }
    ];
  }

  private getTotal(): number {
    return this.purchases.reduce((total, {price}) => total += price, 0);
  }
}
