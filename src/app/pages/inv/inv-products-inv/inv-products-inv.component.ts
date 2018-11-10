import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IProductsService } from "../../../services/inv/i-products.service";

@Component({
  selector: "app-inv-products-inv",
  templateUrl: "./inv-products-inv.component.html",
  styleUrls: ["./inv-products-inv.component.css"]
})
export class InvProductsInvComponent implements OnInit {
  invInfo: any = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productSvc: IProductsService
  ) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.productSvc.getById(id).subscribe(inv => {
        this.invInfo = inv;
      });
    }
  }

}
