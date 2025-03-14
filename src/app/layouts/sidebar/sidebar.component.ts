// layouts/admin-layout/sidebar/sidebar.component.ts
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  title: string;
  route: string;
  icon: string;
  requiredRole?: string | string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);

  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: ``
    },
    {
      title: 'Users',
      route: '/users',
      icon: ``,
      requiredRole: ['admin', 'editor']
    },
    {
      title: 'Reports',
      route: '/reports',
      icon: ``
    }
  ];

  canShowItem(item: NavItem): boolean {
    if (!item.requiredRole) {
      return true;
    }

    return this.authService.hasRole(item.requiredRole);
  }
}