import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, catchError, map, switchMap } from 'rxjs';

import * as apiClientActions from '../../state/api-client/api-client.action';
import { ApiClientService } from 'src/app/core/services/api-client.service';

@Injectable({ providedIn: 'root' })
export class ApiClientStateEffect {
  public fetchApiClient$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiClientActions.GET_API_CLIENT_LIST_START),
      switchMap((action: apiClientActions.ApiClientActions) => {
        return this.apiClientService.getApiClientPaginatedData().pipe(
          map((response) => {
            return new apiClientActions.GetApiClientListSuccess(response);
          }),
          catchError((error) => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  constructor(
    private apiClientService: ApiClientService,
    private actions$: Actions
  ) {}
}
