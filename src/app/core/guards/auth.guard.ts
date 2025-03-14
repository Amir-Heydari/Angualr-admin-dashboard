import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn) {
        return true;
    }

    // Redirect to login page
    return router.parseUrl('/auth/login');
};

// Role-based guard
export const roleGuard = (allowedRoles: string[]) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn && authService.hasRole(allowedRoles)) {
        return true;
    }

    if (!authService.isLoggedIn) {
        return router.parseUrl('/auth/login');
    }

    // User is logged in but doesn't have the required role
    return router.parseUrl('/unauthorized');
};