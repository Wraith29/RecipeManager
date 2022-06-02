import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { Config } from "../types/config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private _http: HttpClient
  ) { }

  public getConfig(): Promise<Config> {
    return firstValueFrom(this._http.get<Config>('assets/appsettings.json'));
  }
}
