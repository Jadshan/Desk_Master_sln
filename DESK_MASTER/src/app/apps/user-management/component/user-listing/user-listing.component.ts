import { Component, ViewChild } from '@angular/core';
import { UserHandlingComponent } from '../user-handling/user-handling.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { user } from '../../+store/user.model';
import { loadUser } from '../../+store/user.action';
import { getUserList } from '../../+store/user.selector';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList!: user[];
  dataSource: any;
  displayedColumns: string[] = [
    'code',
    'name',
    'username',
    'password',
    'email',
    'phone',
    'gender',
    'role',
    'status',
    'action',
  ];
  constructor(private store: Store, private Dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.store.select(getUserList).subscribe((list) => {
      this.userList = list;
      this.dataSource = new MatTableDataSource<user>(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  AddUser() {
    this.openPopup(0, 'Add New User');
  }
  onEdit(id: number) {
    this.openPopup(id, 'Edit User', true);
  }
  onDelete(id: number) {}

  onChangeRole(id: number) {
    this.openPopup(id, 'HandleRole', false, true);
  }

  openPopup(id: number, title: string, isEdit = false, isRole = false) {
    this.Dialog.open(UserHandlingComponent, {
      width: '50%',
      height: isRole ? 'auto' : '800px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        id: id,
        title: title,
        isEdit: isEdit,
        isRole: isRole,
      },
    });
  }
}
