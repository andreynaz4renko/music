import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploaderComponent,
      multi: true
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor {
  onChange: Function = () => { };
  @ViewChild('fileUploaderInput') fileUploaderInput: ElementRef<HTMLInputElement> | null = null;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }
  /**Используем только ддля обнуления значений */
  writeValue(value: any) {
    this.host.nativeElement.value = '';

    if (this.fileUploaderInput && this.fileUploaderInput.nativeElement) {
      this.fileUploaderInput.nativeElement.value = '';
    }
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

}
