import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor, OnDestroy {
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input() public accept: string = '';

  inputControl = new FormControl('');

  subscription$: SubscriptionLike | null;

  constructor() {
    this.subscription$ = this.inputControl.valueChanges.subscribe(value => {

      this.writeValue(value);
      this.onTouched();
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
    this.subscription$ = null;
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
    this.onChange(value);
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
