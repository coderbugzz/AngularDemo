import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../shared/members.service';
import { NgForm } from '@angular/forms';
import { Members } from '../../shared/members.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styles: [
  ]
})
export class MemberFormComponent implements OnInit {

  constructor(public service: MembersService) {

  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
    this.service.postMember().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putMember().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Members();
  }
}
