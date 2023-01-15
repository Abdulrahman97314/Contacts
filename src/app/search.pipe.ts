import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contactList:any[],serach:any): any[] {
    return contactList.filter(contactList=> contactList.FirstName?.toUpperCase().includes(serach?.toUpperCase()));
  }

}
