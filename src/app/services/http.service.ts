import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  test = "How r u?";
  constructor(private http: HttpClient) {}

  httpGet(url: string) {
    return this.http.get(url);
  }

  httpPost(url: string, {}: any) {
    return this.http.post(url, { name: "Subpart" });
  }

  sendEmail(url: string, data: any) {
    return this.http.post(url, data);
  }
}
