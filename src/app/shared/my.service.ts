import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export interface usersData {
    uID: string,
    profilePic: string,
    username: string,
    email: string,
    platform: string
}

export class MyService {

  sharingData: Observable<usersData[]>
  private _sharingData: BehaviorSubject<usersData[]>;

  private dataStore: {
    sharingData: usersData[]
  };

  constructor() {
    this.dataStore = { sharingData: [] };
    this._sharingData = <BehaviorSubject<usersData[]>>new BehaviorSubject([]);
  }

  saveData( userData ) {
    this.sharingData = userData;
  }
}