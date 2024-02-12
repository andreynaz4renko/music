import { Component, OnInit } from '@angular/core';
import { FileUploaderComponent } from '../../shared/ui/file-uploader/file-uploader.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SpinnerService } from '../../_services/spinner.service';
class Recomendation {
  title: string = '';
  url: string = '';
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

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.results.push({ title: 'test', url: '/test' });


    this.fileInput.valueChanges.subscribe(el => {
      this.file = el;
      this.fileLink = URL.createObjectURL(el);
      this.sendFile();
    });

  }

  deleteFile() {
    this.file = null;
  }

  sendFile() {
    if (this.file) {
      this.spinner.show();
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post(`${environment.apiUrl}/recomendation/`, formData).pipe(
        map((data: any) => {
          this.results = data;
          this.spinner.hide();
        })).subscribe();
    }

  }

}
