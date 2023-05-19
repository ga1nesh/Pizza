import { Injectable } from '@angular/core';
//import { Injectable } from '@angular/core';
import { Store } from '../models/store';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoresService {
  constructor(private http: HttpClient) { }
  getStores() {
      return this.http.get<Store[]>('http://localhost:3000/api/stores/');
  }

  getStore(id: string) {
      return this.http.get<Store>(`http://localhost:3000/api/stores/${id}`);
  }

  addStore(store: FormData) {
      return this.http.post<Store>('http://localhost:3000/api/stores/', store);
  }

  updateStore(store: any, storeId: string) {
      return this.http.put(`http://localhost:3000/api/stores/${storeId}`, store);
  }

  deleteStore(id: string) {
      return this.http.delete(`http://localhost:3000/api/stores/${id}`);
  }
}
