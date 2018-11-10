import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IProductsService } from "../../../services/inv/i-products.service";
import { IProductsInvService } from "../../../services/inv/i-products-inv.service";

@Component({
  selector: "app-inv-products-inv",
  templateUrl: "./inv-products-inv.component.html",
  styleUrls: ["./inv-products-inv.component.css"]
})
export class InvProductsInvComponent implements OnInit {
  invInfo: any = {};
  productInvs: any[] = [];
  invItemInfo: any = {};

  constructor(
    private route: ActivatedRoute,
    private productSvc: IProductsService,
    private productInvSvc: IProductsInvService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.productSvc.getById(id).subscribe(inv => {
        this.invInfo = inv;
      });
      this.loadProductInvs(id);
    }
  }
  
  loadProductInvs(id: string) {
    this.productInvSvc.getByProductId(id).subscribe(invs => {
      this.productInvs = invs;
    });

  }

  addInventory() {
    this.invItemInfo.quantity = 10;
    this.invItemInfo.price = 10;
    this.invItemInfo.totalPrice = 100;
    this.invItemInfo.productId = this.invInfo.id;

    this.productInvSvc.save(this.invItemInfo).subscribe(product => {
      this.loadProductInvs(this.invInfo.id);
    });
  }
}
