/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ListProjectsResponse } from '../models/list-projects-response';
@Injectable({
  providedIn: 'root',
})
class ProjectServiceService extends __BaseService {
  static readonly ProjectServiceListProjectsPath = '/v1/projects';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return A successful response.
   */
  ProjectServiceListProjectsResponse(): __Observable<__StrictHttpResponse<ListProjectsResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/v1/projects`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ListProjectsResponse>;
      })
    );
  }
  /**
   * @return A successful response.
   */
  ProjectServiceListProjects(): __Observable<ListProjectsResponse> {
    return this.ProjectServiceListProjectsResponse().pipe(
      __map(_r => _r.body as ListProjectsResponse)
    );
  }
}

module ProjectServiceService {
}

export { ProjectServiceService }
