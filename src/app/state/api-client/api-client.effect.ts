import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, catchError, map, switchMap } from 'rxjs';

import * as apiClientActions from '../../state/api-client/api-client.action';
import { ApiClientMockService } from 'src/app/core/services/mock/api-client.mock.service';

@Injectable({ providedIn: 'root' })
export class ApiClientStateEffect {
  public fetchApiClient$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiClientActions.GET_API_CLIENT_LIST_START),
      switchMap((action: apiClientActions.GetApiClientListStart) => {
        return this.apiClientService.getApiClientPaginatedData(action.pageNumber).pipe(
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

  public fetchApiClientCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiClientActions.GET_API_CLIENT_COUNT),
      switchMap((action: apiClientActions.ApiClientActions) => {
        return this.apiClientService.getTotalApiClientCount().pipe(
          map((response) => {
            return new apiClientActions.GetApiClientCountSuccess(response);
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
    private apiClientService: ApiClientMockService,
    private actions$: Actions
  ) {}
}
