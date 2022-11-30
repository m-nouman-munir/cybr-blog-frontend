import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../dto/user.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly route: Router
  ) {}
  url: string = environment.serverUrl;

  public async signUp(body: User): Promise<User> {
    let res = this.http.post<User>(
      `${this.url}/authentication/register`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async login(credentials: User): Promise<any> {
    let res = this.http.post<any>(
      `${this.url}/authentication/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'Application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadProfileImage(image: FormData): Promise<FormData> {
    let res = this.http.post<FormData | any>(`${this.url}/profile`, image);
    let data = await lastValueFrom(res);
    return data['url'];
  }

  public isLoggedIn() {
    return localStorage.getItem('accesstoken') != null;
  }

  public getAccessToken() {
    return localStorage.getItem('accesstoken') || '';
  }

  public async logout() {
    localStorage.clear();
    let res = this.http.get(`${this.url}/authentication/logout`);
    let data = await lastValueFrom(res);

    if (data) {
      this.route.navigate(['auhtentication/login']);
      alert('Token Expired');
    }
    return data;
  }
}
