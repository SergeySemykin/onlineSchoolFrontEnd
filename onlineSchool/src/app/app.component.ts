import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pupil } from './pupil';
import { PupilService } from './pupil.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public pupils!:Pupil[];
  public deletePupil!: Pupil;

  constructor(private pupilService:PupilService){}

  ngOnInit(){
    this.getPupils();
  }
  public getPupils():void{
    this.pupilService.getPupils().subscribe(
      (response: Pupil[])=>{
        this.pupils=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onOpenModal(pupil: Pupil, mode: string): void {
    const container = document.getElementById('myContainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPupilModal');
    }
    if (mode === 'delete') {
      this.deletePupil=pupil;
      button.setAttribute('data-target', '#deletePupilModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onAddPupil(addForm: NgForm):void{
    document.getElementById('add-pupil-form').click();
      this.pupilService.addPupils(addForm.value).subscribe(
        (response: Pupil)=>{
          console.log(response);
          this.getPupils();
          addForm.reset();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message)
          addForm.reset();
        }
      );
  }
  public onDeletePupil(pupilId:number):void{
    this.pupilService.deletePupils(pupilId).subscribe(
      (response: void)=>{
        console.log(response);
        this.getPupils();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );

  }
}
