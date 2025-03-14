import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { inject, signal } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header-layout/header-layout.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  isSidebarOpen = signal<boolean>(true);
  currentUser = signal<any>(this.authService.currentUser);

  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
