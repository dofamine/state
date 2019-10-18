import { Injectable } from '@angular/core';
import { StateEntity, StateServiceService } from "./state-service.service";
import { STATE_ENTITIES_KEYS } from "./state-keys";
import { EMPTY, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinners = [];

  constructor(private readonly state: StateServiceService) {
    this.state.registerStateEntity<Array<string>>(STATE_ENTITIES_KEYS.SPINNER, this.spinners);
  }

  generateId(): string {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  roll(id: string | Array<string>) {
    if (id instanceof Array) {
      id.forEach(value => !this.isRolled(value) && this.spinners.push(value))
    } else {
      !this.isRolled(id) && this.spinners.push(id);
    }
    this.state.updateStateByName<Array<string>>(STATE_ENTITIES_KEYS.SPINNER, this.spinners);
  }

  getSpinnerState(id: string): Observable<boolean> {
    if (!id) return EMPTY;

    return this.state.getStateEntityByName$<string>(STATE_ENTITIES_KEYS.SPINNER).pipe(
      map(({currentValue}) => currentValue.includes(id))
    )
  }

  stop(id: string | Array<string>) {
    if (id instanceof Array) {
      id.forEach((value) => this.deleteSpinnerById(value))
    } else {
      this.deleteSpinnerById(id);
    }

    this.state.updateStateByName(STATE_ENTITIES_KEYS.SPINNER, this.spinners);
  }

  private deleteSpinnerById(id: string) {
    const index = this.spinners.findIndex(sId => sId === id);
    if (index < 0) return;
    this.spinners.splice(index, 1);
  }

  private isRolled(id: string): boolean {
    return this.spinners.some((iid) => iid === id);
  }
}
