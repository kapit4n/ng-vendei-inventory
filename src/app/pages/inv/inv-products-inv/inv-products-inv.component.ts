import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IProductsService } from "../../../services/inv/i-products.service";
import { IProductsInvService } from "../../../services/inv/i-products-inv.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-inv-products-inv",
  templateUrl: "./inv-products-inv.component.html",
  styleUrls: ["./inv-products-inv.component.css"]
})
export class InvProductsInvComponent implements OnInit {
  invInfo: any = {};
  productInvs: any[] = [];
  invItemInfo: any = {};
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
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

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  loadProductInvs(id: string) {
    this.productInvSvc.getByProductId(id).subscribe(invs => {
      this.productInvs = invs;
    });
  }

  saveInvItem() {
    this.invItemInfo.totalPrice = this.invItemInfo.quantity * this.invItemInfo.price;
    this.invItemInfo.productId = this.invInfo.id;

    this.productInvSvc.save(this.invItemInfo).subscribe(product => {
      this.loadProductInvs(this.invInfo.id);
    });
  }
}
