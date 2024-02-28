import { employeeReducer } from 'src/app/apps/employ-management/+Store/Employee/employee.reducer';
import { blogReducer } from '../../apps/BlogApp/+Store/blog.reducer';
import { counterReducer } from '../../apps/CounterApp/+Store/counter.reducer';
import { AppReducer } from './App.reducer';
import { userReducer } from 'src/app/apps/user-management/+store/user.reducer';
import { authReducer } from 'src/app/auth/+Store/user.reducer';
import { hrReducer } from 'src/app/apps/hr-view/+store/hr.reducer';
import { schedularReducer } from 'src/app/apps/scheduler/+store/schedular.reducer';

export const AppState = {
  counter: counterReducer,
  blog: blogReducer,
  app: AppReducer,
  employ: employeeReducer,
  user: userReducer,
  auth: authReducer,
  interview: hrReducer,
  schedular: schedularReducer,
};
