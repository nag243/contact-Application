import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyContact } from '../models/myContact';
import { catchError, observable, Observable, throwError } from 'rxjs';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `http://localhost:4000`

  constructor(private http: HttpClient) { }

  // Get All Contacts Data
  public getAllContacts() {
    let dataUrl: string = `${this.baseUrl}/contacts`
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }
  // get single contact
  public getContacts(contactId: string): Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }
  // create contactId
  public CreateContacts(contact: MyContact): Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl, contact).pipe(catchError(this.handleError))
  }
  // Update contact
  public updateContacts(contact: MyContact, contactId: string): Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl, contact).pipe(catchError(this.handleError))
  }
  // delete contact
  public deleteContacts(contactId: string): Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }
  // Get All Group
  public getAllGroup():Observable<MyGroup> {
    let dataUrl: string = `${this.baseUrl}/contacts`
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }
  // get single Groups
  public getGroup(contact: MyContact): Observable<MyGroup> {
    let dataUrl: string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }


  public handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof Error) {
      // client Error);
      errorMessage = `Error: $(error.error.message)`
    } else {
      errorMessage = `Status:${error.status} \n Message: $(error.message)`;
    }
    return throwError(errorMessage)
  }
}
