import { BehaviorSubject, Observable } from "rxjs";

export abstract class StateManager<T> {
  protected state: T = {} as T;
  protected readonly _state$: BehaviorSubject<T> = new BehaviorSubject<T>(this.state);

  protected abstract get state$(): Observable<T>

  protected abstract registerStateEntity<K>(key: string, value: K): void

  protected abstract deleteStateEntity(key: string): void

  protected abstract updateStateByName<K>(key: string, value: K): void

  protected abstract getStateEntityByName$(key: string): Observable<any>

  protected abstract isKeyRegistered(key: string) : boolean

  protected abstract dispatch(): void
}
