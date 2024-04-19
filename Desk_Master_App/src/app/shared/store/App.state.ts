import { blogReducer } from '../../apps/BlogApp/+Store/blog.reducer';
import { AppReducer } from './App.reducer';
import { authReducer } from '../../auth/+Store/user.reducer';
import { schedularReducer } from '../../apps/scheduler/+store/schedular.reducer';
import { hrReducer } from '../../apps/hr-view/+store/hr.reducer';
import {
  employeeDataReducer,
  employeeReducer,
} from '../../apps/employ-management/+Store/Employee/employee.reducer';
import { userReducer } from '../../auth/user-management/+store/user.reducer';

export const AppState = {
  blog: blogReducer,
  app: AppReducer,
  employ: employeeReducer,
  employData: employeeDataReducer,
  user: userReducer,
  auth: authReducer,
  interview: hrReducer,
  schedular: schedularReducer,
};
