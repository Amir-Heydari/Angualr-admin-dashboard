import { Component, Input } from '@angular/core';
import { User } from '../../../features/users/users.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent {
  @Input() user!: User;
  showDropdown = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  activateUser(): void {
    this.user.status = 'active';
    this.showDropdown = false;
    // In a real app, you would call a service to update the user status
    console.log(`User ${this.user.name} activated`);
  }

  deactivateUser(): void {
    this.user.status = 'inactive';
    this.showDropdown = false;
    // In a real app, you would call a service to update the user status
    console.log(`User ${this.user.name} deactivated`);
  }

  deleteUser(): void {
    // In a real app, you would call a service to delete the user
    console.log(`User ${this.user.name} deletion requested`);
    this.showDropdown = false;
  }

  promoteUser(): void {
    // In a real app, you would call a service to promote the user
    console.log(`User ${this.user.name} promotion requested`);
    this.showDropdown = false;
  }
}
