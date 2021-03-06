import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InvProductsComponent } from './pages/inv/inv-products/inv-products.component';
import { IConfigService } from './services/inv/i-config.service';
import { IProductsService } from './services/inv/i-products.service';
import { InvProductsInvComponent } from './pages/inv/inv-products-inv/inv-products-inv.component';

const appRoutes: Routes = [
  {
    path: "inv/products",
    component: InvProductsComponent,
    data: { breadcrumb: "Inv Products" }
  },
  {
    path: "inv/products/:id",
    component: InvProductsInvComponent,
    data: { breadcrumb: "Inv Products" }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InvProductsComponent,
    InvProductsInvComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ IConfigService, IProductsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
