import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Data } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Dinfo } from './donor_info.model';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';


// import { FormBuilder, FormGroup } from '@angular/forms';

interface PlacedataDonor {
  name: string;
  age: number;
  phone_number: number;
  email: string;
  first_donation: string;
  last_b_date: number;
  diseases: string[];
  blood_group: string;
  home_add: string;
  office_add: string;
  password: string;
  latitude: string;
  longitude: string;
}
interface PlacedataPatient {
  name: string;
  age: string;
  phone_number: string;
  blood_group: string;
  diseases: string[];
  mediator_required: string;
  med_name: string;
  med_phone_number: string;
  med_email: string;
  home_add: string;
  clinic_add: string;
  password: string;
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {
  private dinfo: Dinfo =
    {
      _id: '121',
      name: 'rutwik',
      age: '12',
      phone_number: '1234567890',
      email: 'dsfas@tftut',
      first_donation: 'Yes',
      last_b_date: '2014-01-31',
      diseases: ['dfers', 'sdfasfa', 'rsfgsf'],
      blood_group: 'Avfwd',
      home_add: 'gergergergae',
      office_add: 'dfsfgasrgearga',
      password: 'erweerte',
      latitude: '1234123.3412',
      longitude: 'frefgergew'
    };
  //SERVER_DONOR_REG = 'http://localhost:3000/donor_reg';
  //SERVER_PATIENT_REG = 'http://localhost:3000/patient_reg';
  SERVER_TEST = 'http://localhost:3000/test';
  SERVER_LOGIN_DONOR = 'https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Donors.json';
  SERVER_LOGIN_PATIENT = 'https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Patients.json';
  FIRE_TEST = 'https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Donors.json'

  dict:any = [];
  objectKeys = [];
  dict_expand:any = [];
  objectKeys_expand = [];
  dict_expand_10:any = [];
  objectKeys_expand_10 = [];

  dataDonor: any = [
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    [],
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
  ];
  dataPatient: any = [
    'Data',
    'Data',
    'Data',
    'Data',
    [],
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    'Data',
    'Data'
  ];
  what: any;
  info: string;
  // uploadForm: FormGroup;

  constructor(private httpClient: HttpClient, private router: Router, private AlertCrtl: AlertController, private sms:SMS) { }

  check(msg: string) {
    console.log(msg + ' works');
  }
  submit(f: NgForm) {

    // console.log(f);
    // console.log(f.value.email);
    this.httpClient.post<any>(this.SERVER_TEST, f.value).subscribe(
      (res) => console.log(res.body),
      (err) => console.log(err)
    );
    // this.router.navigate(['landingpage']);
    // this.router.navigate(['landingpage/patientreg']);
  }

  get_donor_keys(){
    return this.objectKeys;
  }

  get_donor_search() {
    return this.dict;
  }

  get_donor_keysExpand(){
    return this.objectKeys_expand;
  }

  get_donor_searchExpand() {
    return this.dict_expand;
  }

  get_donor_keysExpand_10(){
    return this.objectKeys_expand_10;
  }

  get_donor_searchExpand_10() {
    return this.dict_expand_10;
  }

  get_donor_data() {
    return this.dataDonor;
  }
  get_patient_data() {
    return this.dataPatient;
  }
  donor_edit() {
    this.router.navigate(['landingpage/login/donoraccount/donordetails']);
  }
  patient_edit() {
    this.router.navigate(['landingpage/login/patientaccount/patientdetails']);
  }

  submit_patient(f: NgForm) {
    this.httpClient.post<any>('https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Patients.json', f.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.AlertCrtl.create({
      header: 'Registered !',
      message: 'You have successfully registered to be a Patient. Login with your name and password',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['landingpage/login']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  check_login(val: string) {
    return this.httpClient.get<{ [key: string]: PlacedataDonor }>(this.FIRE_TEST).pipe(tap(
      resData => {
        console.log(resData);
        for (const key in resData) {
          if (true) {
            console.log(key);
          }
        }
      }
    ));
  }

  submit_login_donor(f: NgForm) {
    return this.httpClient.get<{ [key: string]: PlacedataDonor }>(this.SERVER_LOGIN_DONOR).pipe(tap(
      resData => {
        console.log(resData);
        if (resData !== null) {
          for(const key in resData){
            if(resData[key].name === f.value.name && resData[key].password === f.value.password){
              this.AlertCrtl.create({
                header: 'Login Successful !',
                message: 'Click OK to proceed',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['landingpage/login/donoraccount']);
                    }
                  }
                ]
              }).then(alertEl => {
                alertEl.present();
              });
              this.dataDonor[0] = resData[key].name;
              this.dataDonor[1] = resData[key].age;
              this.dataDonor[2] = resData[key].phone_number;
              this.dataDonor[3] = resData[key].email;
              this.dataDonor[4] = resData[key].first_donation;
              this.dataDonor[5] = resData[key].last_b_date;
              this.dataDonor[6] = resData[key].diseases;
              this.dataDonor[7] = resData[key].blood_group;
              this.dataDonor[8] = resData[key].home_add;
              this.dataDonor[9] = resData[key].office_add;
              this.dataDonor[10] = resData[key].password;
              this.dataDonor[11] = resData[key].latitude;
              this.dataDonor[12] = resData[key].longitude;
              this.dataDonor[13] = key;
            }
          }
          

        } else {
          console.log('Resdata is empty');
          this.AlertCrtl.create({
            header: 'Login Unsuccessful',
            message: 'Please check your name and password',
            buttons: [
              {
                text: 'Okay'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
        }
    }));
  }


  submit_login_patient(f: NgForm) {
    return this.httpClient.get<{ [key: string]: PlacedataPatient }>(this.SERVER_LOGIN_PATIENT).pipe(tap(
      resData => {
        console.log(resData);
        if (resData !== null) {
          for(const key in resData){
            if(resData[key].name === f.value.name && resData[key].password === f.value.password){
              this.AlertCrtl.create({
                header: 'Login Successful !',
                message: 'Click OK to proceed',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['landingpage/login/patientaccount']);
                    }
                  }
                ]
              }).then(alertEl => {
                alertEl.present();
              });
              this.dataPatient[0] = resData[key].name;
              this.dataPatient[1] = resData[key].age;
              this.dataPatient[2] = resData[key].phone_number;
              this.dataPatient[3] = resData[key].blood_group;
              this.dataPatient[4] = resData[key].diseases;
              this.dataPatient[5] = resData[key].mediator_required;
              this.dataPatient[6] = resData[key].med_name;
              this.dataPatient[7] = resData[key].med_phone_number;
              this.dataPatient[8] = resData[key].med_email;
              this.dataPatient[9] = resData[key].home_add;
              this.dataPatient[10] = resData[key].clinic_add;
              this.dataPatient[11] = resData[key].password;
              this.dataPatient[12] = resData[key].latitude;
              this.dataPatient[13] = resData[key].longitude;
              this.dataPatient[14] = key;
            }
          }
          

        } else {
          console.log('Resdata is empty');
          this.AlertCrtl.create({
            header: 'Login Unsuccessful',
            message: 'Please check your name and password',
            buttons: [
              {
                text: 'Okay'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
        }
    }));
  }

  submit_donor(f: NgForm) {
    this.httpClient.post<any>('https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Donors.json', f.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    this.AlertCrtl.create({
      header: 'Registered !',
      message: 'You have successfully registered to be a donor. Login with your name and password',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['landingpage/login']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  search_patient_login(){
    this.AlertCrtl.create({
      header:  'Search the donors around you?',
      message: 'Click Yes to proceed',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['landingpage/login/patientaccount/patientdetails/patientexpand'])
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
    const lat_patient = parseFloat(this.dataPatient[12]);
    const long_patient = parseFloat(this.dataPatient[13]);
    console.log(this.dataPatient[0]);
    return this.httpClient.get<{ [key: string]: PlacedataDonor }>(this.FIRE_TEST).pipe(tap(
      resData => {
        console.log(resData);
        for (const key1 in resData) {
          const lat_donor = parseFloat(resData[key1].latitude);
          const lat_diff = lat_patient-lat_donor;
          const lat_diff_kmeters = Math.abs(lat_diff)*111.139;
          const long_donor = parseFloat(resData[key1].longitude);
          const long_diff = long_patient-long_donor;
          const long_diff_kmeters = Math.abs(long_diff)*111.139;
          const distance =  Math.sqrt((lat_diff_kmeters*lat_diff_kmeters)+(long_diff_kmeters*long_diff_kmeters));
          if(distance<=5)
          {
            this.dict[resData[key1].name] = [distance,resData[key1].phone_number];
          }
        }
        this.objectKeys = Object.keys(this.dict);
      
      }
    ));
  }

  search_patient_expand(val:number){
    const lat_patient = parseFloat(this.dataPatient[12]);
    const long_patient = parseFloat(this.dataPatient[13]);
    return this.httpClient.get<{ [key: string]: PlacedataDonor }>(this.FIRE_TEST).pipe(tap(
      resData => {
        console.log(resData);
        for (const key1 in resData) {
          const lat_donor = parseFloat(resData[key1].latitude);
          const lat_diff = lat_patient-lat_donor;
          const lat_diff_kmeters = Math.abs(lat_diff)*111.139;
          const long_donor = parseFloat(resData[key1].longitude);
          const long_diff = long_patient-long_donor;
          const long_diff_kmeters = Math.abs(long_diff)*111.139;
          const distance =  Math.sqrt((lat_diff_kmeters*lat_diff_kmeters)+(long_diff_kmeters*long_diff_kmeters));
          if(distance>5 && distance<10)
          {
            this.dict_expand[resData[key1].name] = [distance,resData[key1].phone_number];
          }
        }
        this.objectKeys_expand = Object.keys(this.dict_expand);
      
      }
    ));
  }

  search_patient_expand_10(val:number){
    const lat_patient = parseFloat(this.dataPatient[12]);
    const long_patient = parseFloat(this.dataPatient[13]);
    return this.httpClient.get<{ [key: string]: PlacedataDonor }>(this.FIRE_TEST).pipe(tap(
      resData => {
        console.log(resData);
        for (const key1 in resData) {
          const lat_donor = parseFloat(resData[key1].latitude);
          const lat_diff = lat_patient-lat_donor;
          const lat_diff_kmeters = Math.abs(lat_diff)*111.139;
          const long_donor = parseFloat(resData[key1].longitude);
          const long_diff = long_patient-long_donor;
          const long_diff_kmeters = Math.abs(long_diff)*111.139;
          const distance =  Math.sqrt((lat_diff_kmeters*lat_diff_kmeters)+(long_diff_kmeters*long_diff_kmeters));
          if(distance>10 && distance<15)
          {
            this.dict_expand_10[resData[key1].name] = [distance,resData[key1].phone_number];
          }
        }
        this.objectKeys_expand_10 = Object.keys(this.dict_expand_10);
      
      }
    ));
  }

  update_patientAccount(f:NgForm){
    const current_key = this.dataPatient[14];
    if(f.value.name == ''){
      f.value.name = this.dataPatient[0];
    }
    if(f.value.age == ''){
      f.value.age = this.dataPatient[1];
    }
    if(f.value.phone_number == ''){
      f.value.phone_number = this.dataPatient[2];
    }
    if(f.value.blood_group == ''){
      f.value.blood_group = this.dataPatient[3];
    }
    if(f.value.diseases == ''){
      f.value.diseases = this.dataPatient[4];
    }
    if(f.value.mediator_required == ''){
      f.value.mediator_required = this.dataPatient[5];
    }
    if(f.value.med_name == ''){
      f.value.med_name = this.dataPatient[6];
    }
    if(f.value.med_phone_number == ''){
      f.value.med_phone_number = this.dataPatient[7];
    }
    if(f.value.med_email == ''){
      f.value.med_email = this.dataPatient[8];
    }
    if(f.value.home_add == ''){
      f.value.home_add = this.dataPatient[9];
    }
    if(f.value.clinic_add == ''){
      f.value.clinic_add = this.dataPatient[10];
    }
    if(f.value.password == ''){
      f.value.password = this.dataPatient[11];
    }
    if(f.value.latitude == ''){
      f.value.latitude = this.dataPatient[12];
    }
    if(f.value.longitude == ''){
      f.value.longitude = this.dataPatient[13];
    }
    this.httpClient.put<any>('https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Patients/'+current_key+'.json', f.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    this.AlertCrtl.create({
      header: 'Updated!!',
      message: 'You have successfully updated your information. Login with your name and password',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['landingpage/login/patientaccount']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  update_DonorAccount(f:NgForm){
    const current_key = this.dataDonor[13];
    if(f.value.name == ''){
      f.value.name = this.dataDonor[0];
    }
    if(f.value.age == ''){
      f.value.age = this.dataDonor[1];
    }
    if(f.value.phone_number == ''){
      f.value.phone_number = this.dataDonor[2];
    }
    if(f.value.email == ''){
      f.value.email = this.dataDonor[3];
    }
    if(f.value.first_donation == ''){
      f.value.first_donation = this.dataDonor[4];
    }
    if(f.value.last_b_date == ''){
      f.value.last_b_date = this.dataDonor[5];
    }
    if(f.value.diseases == ''){
      f.value.diseases = this.dataDonor[6];
    }
    if(f.value.blood_group == ''){
      f.value.blood_group = this.dataDonor[7];
    }
    if(f.value.home_add == ''){
      f.value.home_add = this.dataDonor[8];
    }
    if(f.value.office_add == ''){
      f.value.office_add = this.dataDonor[9];
    }
    if(f.value.password == ''){
      f.value.password = this.dataDonor[10];
    }
    if(f.value.latitude == ''){
      f.value.latitude = this.dataDonor[11];
    }
    if(f.value.longitude == ''){
      f.value.longitude = this.dataDonor[12];
    }
    this.httpClient.put<any>('https://blood-donation-app-3f5cd.firebaseio.com/blood-donation-app-3f5cd/Donors/'+current_key+'.json', f.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    this.AlertCrtl.create({
      header: 'Updated!!',
      message: 'You have successfully updated your information. Login with your name and password',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['landingpage/login/donoraccount']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}

