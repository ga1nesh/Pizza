import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from '../../models/pizza';
import { PizzasService } from '../../services/pizzas.service';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})


export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];


  constructor(
    private pizzaService: PizzasService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getPizzas();
  }


  private getPizzas() {
    this.pizzaService.getPizzas().subscribe((pizzas) => {
      this.pizzas = pizzas;
    })
  }


  deletePizza(id: string) {
    this.pizzaService.deletePizza(id).subscribe((pizza) => {
      this.getPizzas();
    })
  }


  updatePizza(id: string) {
    this.router.navigateByUrl(`pizza-create/${id}`)
  }
}
