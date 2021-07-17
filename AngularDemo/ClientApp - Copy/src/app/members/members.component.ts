import { Component, OnInit } from '@angular/core';
import { Members } from '../shared/members.model';
import { MembersService } from '../shared/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styles: [
  ]
})
export class MembersComponent implements OnInit {

  constructor(public service: MembersService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Members) {
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id:number)
  {
    this.service.deleteMember(id)
    .subscribe(
      res=>{
         this.service.refreshList();
      },
      err=>{console.log(err)}
    )
  }
}
