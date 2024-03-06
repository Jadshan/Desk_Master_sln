import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../../../auth/service/user.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css'],
})
export class MenuHeaderComponent implements DoCheck, OnInit {
  isMenuVisible: boolean = true;
  menuList!: any;
  isDrawerOpen: boolean = false;
  constructor(
    private router: Router,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    if (this.isDrawerOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }
  closeDrawer() {
    this.isDrawerOpen = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
  onContentClick() {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    }
  }
  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/login' || currentRoute === '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
      this.menuList = this.userService.GetUserDataFromStorage('menuData');
    }
  }

  logout() {
    localStorage.clear();
  }
}
