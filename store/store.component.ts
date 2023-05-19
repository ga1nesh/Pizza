import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { StoresService } from '../services/stores.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores: Store[] = [];


  constructor(
    private storesService: StoresService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getStores();
  }

  private getStores() {
    this.storesService.getStores().subscribe((stores) => {
      this.stores = stores;
    })
  }


  deleteStore(id: string) {
    this.storesService.deleteStore(id).subscribe((store) => {
      this.getStores();
    })
  }


  updateStore(id: string) {
    this.router.navigateByUrl(`store-create/${id}`)
  }
}

