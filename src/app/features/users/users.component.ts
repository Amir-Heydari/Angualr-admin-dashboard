import { Component, OnInit } from '@angular/core';
import { SingleUserComponent } from '../../shared/components/single-user/single-user.component';
import { CommonModule } from '@angular/common';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: Date;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SingleUserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];

  constructor() { }

  ngOnInit(): void {
    // Mock users data
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'active',
        joinDate: new Date('2023-10-15')
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'active',
        joinDate: new Date('2023-11-05')
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        role: 'Editor',
        status: 'inactive',
        joinDate: new Date('2024-01-22')
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'User',
        status: 'active',
        joinDate: new Date('2024-02-08')
      },
      {
        id: 5,
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        role: 'Moderator',
        status: 'inactive',
        joinDate: new Date('2023-12-17')
      }
    ];
  }
}
