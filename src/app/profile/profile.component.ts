import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  contactList = JSON.parse(localStorage.getItem("contactList")!)
  contact = JSON.parse(localStorage.getItem("contact")!)
  profile: any = ""
  index: number = 0
  number: number = 0
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit(): void {
    let { index, number } = this._ActivatedRoute.snapshot.params
    this.profile = this.contactList[index].record[number]
    this.index = index
    this.number = number
  }
  Delete() {
    for (let i = 0; i <= this.contact.length; i++) {
      if (this.contact[i]?.Number ==this.contactList![this.index].record[this.number].Number) {
        this.contact.splice(i, 1);
      }
    }
    this.contactList[this.index].record.splice(this.number, 1);
    localStorage.setItem("contact", JSON.stringify(this.contact));
    localStorage.setItem("contactList", JSON.stringify(this.contactList));
    this._Router.navigate(["/ContactList"])
  }

}
