'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { logout } from './auth.action';
import { toast } from 'sonner';
import {Router} from "next/router";

export const logoutUser = async (router: Router) => {
    try {
        // Sign out from Firebase Authentication
        await signOut(auth);

        // Call server action to clear cookies
        await logout();

        // Show success toast notification - matching the exact format from AuthForm
        toast.success("Sign out successfully.");

        // Redirect to sign-in page using Next.js router
        router.push('/sign-in');

        return { success: true };
    } catch (error) {
        console.error('Logout failed:', error);
        toast.error(`There was an error: ${error}`);
        return { success: false, error };
    }
};