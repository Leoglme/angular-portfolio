import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  postNewCategory(url: string, data: any) {
    return this.http.post(url, data);
  }
}

