import {Component, OnInit} from '@angular/core';
import {FileUploaderComponent} from '../../shared/ui/file-uploader/file-uploader.component';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import {SpinnerService} from '../../_services/spinner.service';
class Recomendation {
  name: string = '';
  probability: number = 0;
  filedata: string = '';
  link: string = '';
}

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [FileUploaderComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent implements OnInit {

  public fileInput: FormControl = new FormControl('');
  public results: Recomendation[] = [];
  public file: File | null = null;
  public fileLink: string = '';
  public resultLink: string = '';

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fileInput.valueChanges.subscribe(el => {
      this.file = el;
      this.fileLink = URL.createObjectURL(el);
      this.sendFile();
    });
  }

  deleteFile() {
    this.file = null;
    this.results = [];
  }

  sendFile() {
    if (this.file) {
      this.spinner.show();
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post<Recomendation[]>(`${environment.apiUrl}/recomendation`, formData)
        .subscribe(res => {
          this.results = res;

          this.results.forEach(result => {
            const binaryData = atob(result.filedata);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const view = new Uint8Array(arrayBuffer);

            for (let i = 0; i < binaryData.length; i++) {
              view[i] = binaryData.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
            result.link = URL.createObjectURL(blob);
          });

          this.spinner.hide();
          this.cdRef.detectChanges();
          console.log(this.results);
        }, error => this.spinner.hide());
    }

  }

}
