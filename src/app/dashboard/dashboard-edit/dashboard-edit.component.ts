import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { People } from 'src/app/shared/interface/people';
import { DashboardService } from '../dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
})
export class DashboardEditComponent implements OnChanges {
  @Input() data: People;
  userForm: FormGroup;
  userUpdatedData: People;

  filterList = {
    gender: ['male', 'female'],
    eyeColor: ['brown', 'blue', 'green'],
    pet: ['dog', 'cat', 'bird', 'none'],
    fruit: ['apple', 'strawberry', 'banana', 'mango'],
  };

  constructor(private dashboardService: DashboardService, private formBuilder: FormBuilder) {}

  ngOnChanges() {
    if (this.data) {
      this.userUpdatedData = this.data;
      this.userForm = this.formBuilder.group({
        name: this.formBuilder.control(this.userUpdatedData.name, [
          Validators.required,
          Validators.minLength(1),
        ]),
        age: this.formBuilder.control(this.userUpdatedData.age, [Validators.required]),
        gender: this.formBuilder.control(this.userUpdatedData.gender, [Validators.required]),
        eye: this.formBuilder.control(this.userUpdatedData.eyeColor, [
          Validators.required,
          Validators.minLength(1),
        ]),
        pet: this.formBuilder.control(this.userUpdatedData.preferences.pet, [
          Validators.required,
          Validators.minLength(1),
        ]),
        fruit: this.formBuilder.control(this.userUpdatedData.preferences.fruit, [
          Validators.required,
          Validators.minLength(1),
        ]),
        longitude: this.formBuilder.control(this.userUpdatedData.location.longitude, [
          Validators.required,
        ]),
        latitude: this.formBuilder.control(this.userUpdatedData.location.latitude, [
          Validators.required,
        ]),
      });
    }
  }

  hideUser() {
    this.dashboardService.editUser$.next({ user: null, updatedUser: null });
  }

  setFruit(event) {
    this.userUpdatedData.preferences.fruit = event;
  }

  setGender(event) {
    this.userUpdatedData.gender = event;
  }

  setEye(event) {
    this.userUpdatedData.eyeColor = event;
  }

  setPet(event) {
    this.userUpdatedData.preferences.pet = event;
  }

  changeUserData() {
    this.dashboardService.editUser$.next({ user: null, updatedUser: this.userUpdatedData });
  }
}
