import { blogReducer } from '../../apps/BlogApp/+Store/blog.reducer';
import { counterReducer } from '../../apps/CounterApp/+Store/counter.reducer';
import { AppReducer } from './App.reducer';
import { userReducer } from '../../apps/user-management/+store/user.reducer';
import { authReducer } from '../../auth/+Store/user.reducer';
import { schedularReducer } from '../../apps/scheduler/+store/schedular.reducer';
import { hrReducer } from '../../apps/hr-view/+store/hr.reducer';
import { employeeReducer } from '../../apps/employ-management/+Store/Employee/employee.reducer';

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
