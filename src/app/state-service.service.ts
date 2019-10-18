import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { StateManager } from "./state-manager";

@Injectable({
  providedIn: 'root'
})
export class StateServiceService extends StateManager<State> {
  protected state: State = {} as State;
  protected readonly _state$: BehaviorSubject<State> = new BehaviorSubject<State>(this.state);

  protected get state$(): Observable<State> {
    return this._state$.asObservable();
  }

  registerStateEntity<T = null>(key: string, value: T = null): void {
    if (this.state[key]) return;
    this.state = { ...this.state, [key]: { currentValue: JSON.parse(JSON.stringify(value)), previousValue: null } };
    this.dispatch();
  }

  deleteStateEntity(key: string): void {
    this.state[key] && delete this.state[key];
  }

  updateStateByName<T>(key: string, value: T): void {
    if (!this.state[key]) return;
    const previousValue = JSON.parse(JSON.stringify(this.state[key].currentValue));
    const currentValue = JSON.parse(JSON.stringify(value));

    this.state[key] = {currentValue, previousValue};
    this.dispatch();
  }

  isKeyRegistered(key: string): boolean {
    return !!this.state[key];
  }

  updateStateOnCallByName$<T>(key: string, call: Observable<T>): Observable<T> {
    if (!this.state[key]) return EMPTY;
    return call.pipe(tap((data: T) => this.updateStateByName(key, data)));
  }

  getStateEntityByName$<T>(key: string): Observable<StateEntity<T>> {
    if (!this.state[key]) return EMPTY;

    return this.state$.pipe(
      map(({ [key]: target }) => target),
      distinctUntilChanged()
    )
  }

  protected dispatch(): void {
    this._state$.next({ ...this.state });
  }
}

export interface State {
  [key: string]: StateEntity<any>;
}

export interface StateEntity<T> {
  previousValue: T | null;
  currentValue: T;
}
