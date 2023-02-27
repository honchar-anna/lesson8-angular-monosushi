import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { ProductComponent } from './pages/product/product.component';

import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

const routes: Routes = [
 
  {path:'', component:HomeComponent},
  {path:'actions', component:DiscountComponent},
  {path:'product/:category', component:ProductComponent},
  {path:'dostavka-ta-oplata', component:DeliveryComponent},
  {path:'pro-nas', component:AboutComponent},
  {path:'admin', component:AdminComponent, children:[
     {path:'categories', component:AdminCategoryComponent},
     {path:'products', component:AdminProductsComponent},
     {path:'orders', component:AdminOrdersComponent},
     {path:'actions', component:AdminDiscountComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }