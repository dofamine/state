import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef, EmbeddedViewRef,
  EventEmitter,
  Inject, Injector, Input, OnDestroy, OnInit,
  Output, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { SpinnerComponent } from "./spinner/spinner.component";
import { SpinnerService } from "./spinner.service";
import { Subscription } from "rxjs";

@Directive({
  selector: '[appSpinable]'
})
export class SpinableDirective implements OnInit, OnDestroy {
  @Input() id: string;
  private spinner: ComponentRef<SpinnerComponent>;
  private readonly subscription: Subscription = new Subscription();

  constructor(private readonly element: ElementRef,
              private readonly resolver: ComponentFactoryResolver,
              private readonly spinnerService: SpinnerService,
              private readonly injector: Injector) {
    element.nativeElement.style.position = 'relative';
    this.createSpinnerComponent();
  }

  ngOnInit(): void {
    const sub = this.spinnerService.getSpinnerState(this.id).subscribe((state) => {
      if (!state && this.spinner !== null) this.removeSpinnerComponent();
      if (state && this.spinner === null) this.createSpinnerComponent();
    });

    this.subscription.add(sub);
  }

  private removeSpinnerComponent() {
    this.element.nativeElement.removeChild((this.spinner.hostView as EmbeddedViewRef<SpinnerComponent>).rootNodes[0] as HTMLElement);
    this.spinner.destroy();
    this.spinner = null;
  }

  private createSpinnerComponent() {
    const factory = this.resolver.resolveComponentFactory(SpinnerComponent);
    this.spinner = factory.create(this.injector);
    this.element.nativeElement.appendChild((this.spinner.hostView as EmbeddedViewRef<SpinnerComponent>).rootNodes[0] as HTMLElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
