import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from '../../services/stores.service';
//import { StoreService } from "../../services/store.service";
import { timer } from 'rxjs';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})


export class StoreCreateComponent implements OnInit {

  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  currentStoreId: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storesService: StoresService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],


      phoneNumber: ['', Validators.required],
      adress: ['', Validators.required],
       image2: ['', Validators.required],
       fileSource: ['', Validators.required]
    })
    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const storeFormData = new FormData();
    storeFormData.append('name', this.form.get('name').value);
    // storeFormData.append('price', this.form.get('price').value);
    // storeFormData.append('category', this.form.get('category').value);
    storeFormData.append('phoneNumber', this.form.get('phoneNumber').value);
    storeFormData.append('adress', this.form.get('adress').value);
    storeFormData.append('image2', this.form.get('fileSource').value);
    if (this.editMode) {
      this.updateStore(storeFormData);
    } else {
      this.addStore(storeFormData);
    }
  }


  private updateStore(storeFormData: FormData) {
    this.storesService
      .updateStore(storeFormData, this.currentStoreId)
      .subscribe(() => {
        this.isSubmitted = false;
        this.form.reset();
        timer(500)
          .toPromise()
          .then(() => {
            this.router.navigate(['/store']);
          })
      })
  }


  private addStore(store: FormData) {
    this.storesService.addStore(store).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/store']);
        })
    })
  }


  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentStoreId = params['id'];
        this.storesService.getStore(params['id']).subscribe((store) => {
          this.form.controls['name'].setValue(store.name);
          // this.form.controls['category'].setValue(store.category);
          this.form.controls['phoneNumber'].setValue(store.phoneNumber);
          this.form.controls['adress'].setValue(store.adress);
          // this.form.controls['phoneNumber'].setValue(store.phoneNumber);
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
    this.router.navigate(['/store']);
  }
}
