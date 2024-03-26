import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employ-profile',
  templateUrl: './employ-profile.component.html',
  styleUrls: ['./employ-profile.component.css'],
})
export class EmployProfileComponent implements OnInit {
  generalSettingsForm!: FormGroup;
  changePasswordForm!: FormGroup;
  customTabForm!: FormGroup;
  photoPreview: string | ArrayBuffer | undefined | null =
    'https://img.freepik.com/premium-vector/people-icon-person-symbol-vector-illustration_276184-166.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generalSettingsForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],

      // Add more fields as needed
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to open file input dialog
  selectPhoto(): void {
    const fileInput = document.getElementById('photo');
    if (fileInput) {
      fileInput.click();
    }
  }

  submitGeneralSettings(): void {
    if (this.generalSettingsForm.valid) {
      // Process form submission for general settings
      console.log(
        'General Settings Form Submitted:',
        this.generalSettingsForm.value
      );
    }
  }

  submitChangePassword(): void {
    if (this.changePasswordForm.valid) {
      // Process form submission for changing password
      console.log(
        'Change Password Form Submitted:',
        this.changePasswordForm.value
      );
    }
  }
}
