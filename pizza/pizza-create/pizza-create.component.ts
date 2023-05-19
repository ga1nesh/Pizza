import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzasService } from '../../services/pizzas.service';
import { timer } from 'rxjs';
import { StoresService } from '../../services/stores.service';


@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css']
})


export class PizzaCreateComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  currentPizzaId: string;
  store=[];//cfgfh


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pizzaService: PizzasService,
    private storeService:StoresService,//hdfghh
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      fileSource: ['', Validators.required]
    })
    this.storeService.getStores().subscribe((store) => {
      this.store = store;
    });//dfghgfh

    this.checkEditMode();
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const pizzaFormData = new FormData();
    pizzaFormData.append('name', this.form.get('name').value);
    pizzaFormData.append('price', this.form.get('price').value);
    pizzaFormData.append('category', this.form.get('category').value);
    pizzaFormData.append('stock', this.form.get('stock').value);
    pizzaFormData.append('description', this.form.get('description').value);
    pizzaFormData.append('image', this.form.get('fileSource').value);
    if (this.editMode) {
      this.updatePizza(pizzaFormData);
    } else {
      this.addPizza(pizzaFormData);
    }
  }


  private updatePizza(pizzaFormData: FormData) {
    this.pizzaService
      .updatePizza(pizzaFormData, this.currentPizzaId)
      .subscribe(() => {
        this.isSubmitted = false;
        this.form.reset();
        timer(500)
          .toPromise()
          .then(() => {
            this.router.navigate(['/pizza-list']);
          })
      })
  }


  private addPizza(pizza: FormData) {
    this.pizzaService.addPizza(pizza).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/pizza-list']);
        })
    })
  }


  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentPizzaId = params['id'];
        this.pizzaService.getPizza(params['id']).subscribe((pizza) => {
          this.form.controls['name'].setValue(pizza.name);
          this.form.controls['category'].setValue(pizza.category);
          this.form.controls['price'].setValue(pizza.price);
          this.form.controls['description'].setValue(pizza.description);
          this.form.controls['stock'].setValue(pizza.stock);
        })
      }
    })
  }


  onUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        fileSource: file
      })
    }
  }


  cancel() {
    this.router.navigate(['/pizza-list']);
  }
}
