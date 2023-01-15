import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  constructor(private _Router: Router) { }
  newContact = new FormGroup({
    img: new FormControl(null),
    FirstName: new FormControl(null, [Validators.required]),
    LastName: new FormControl(null, [Validators.required]),
    Number: new FormControl(null, [Validators.required]),
    Email: new FormControl(null, [Validators.required]),

  })
  url:any=""
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }
  contacts: any = "contact" in localStorage ? JSON.parse(localStorage.getItem("contact")!) : []
  contact: any = []
  ngOnInit(): void {
  }
  compare(a: any, b: any) {
    let bandA = a.FirstName?.toUpperCase();
    let bandB = b.FirstName?.toUpperCase();
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  error:string=""
  do(): any {    
    if (this.newContact.status === "VALID" && this.Check() != true) {
      this.contact = this.newContact.value 
      this.contact.img=this.url
      this.contacts.push(this.contact)
      this.contacts?.sort(this.compare)
      localStorage.setItem("contact", JSON.stringify(this.contacts))
      this.order()
      this._Router.navigate(["/ContactList"])
    }
    else if (this.Check()==true){
this.error="This number is already registered"
    }
  }
  Check(): any {
    if (this.contacts?.length > 0) {
      for (var i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].Number == this.newContact.controls.Number.value) {
          return true
        }
      }
    }
    else {
      return false
    }
  }
  result: any = ""
  order(){
    let contactList=JSON.parse(localStorage.getItem("contact")!)
    let data = contactList.reduce((r: any, e: any) => {
      let alphabet = e.FirstName[0].toUpperCase();
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
      else r[alphabet].record.push(e);
      return r;
    }, {});
    this.result = Object.values(data);
    localStorage.setItem("contactList", JSON.stringify(this.result))
  }
}
