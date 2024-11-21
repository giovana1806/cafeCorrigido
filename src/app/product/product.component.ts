import { Component } from '@angular/core';
import { ProductService } from '../../model/services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Iproducts } from '../../model/services/iproducts';
import { StarRatingDirective } from '../Diretivas/star-rating.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StarRatingDirective],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent{
  products: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];

  selectedButton: string = 'featured';

  constructor(private productService: ProductService) {
    this.loadProducts(this.selectedButton);
  }

  loadProducts(selectedButton: string): void {
    this.productService.getProducts().subscribe(
      (data: Iproducts[]) => {
        this.products = data;
        if (selectedButton === 'featured'){
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts = this.products.filter(product => product.filter === selectedButton);
        }
        this.selectedButton = selectedButton;
      },
      (error) =>{
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }
}
