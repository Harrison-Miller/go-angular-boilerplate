/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';
import { LogoutResponse } from '../models/logout-response';
import { LogoutRequest } from '../models/logout-request';
@Injectable({
  providedIn: 'root',
})
class AuthServiceService extends __BaseService {
  static readonly AuthServiceLoginPath = '/v1/login';
  static readonly AuthServiceLogoutPath = '/v1/logout';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AuthServiceLoginResponse(body: LoginRequest): __Observable<__StrictHttpResponse<LoginResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoginResponse>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AuthServiceLogin(body: LoginRequest): __Observable<LoginResponse> {
    return this.AuthServiceLoginResponse(body).pipe(
      __map(_r => _r.body as LoginResponse)
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AuthServiceLogoutResponse(body: LogoutRequest): __Observable<__StrictHttpResponse<LogoutResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/logout`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LogoutResponse>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AuthServiceLogout(body: LogoutRequest): __Observable<LogoutResponse> {
    return this.AuthServiceLogoutResponse(body).pipe(
      __map(_r => _r.body as LogoutResponse)
    );
  }
}

module AuthServiceService {
}

export { AuthServiceService }
