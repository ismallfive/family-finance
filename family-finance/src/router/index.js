import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Assets from '../components/homeViews/Assets.vue';
import Family from '../components/homeViews/Family.vue';
import Mine from '../components/homeViews/Mine.vue';
import Setting from '../views/Setting.vue';
import About from '../views/About.vue';
import Account from '../views/Account.vue';
import ChangePasswd from '../views/ChangePasswd.vue';
import UserInfo from '../views/UserInfo.vue';
import FamilyBill from '@/components/homeViews/familyViews/FamilyBill.vue';
import BindFamily from '@/components/homeViews/familyViews/BindFamily.vue';
import CreateFamily from '@/components/homeViews/familyViews/CreateFamily.vue';
import FamilyManage from '@/components/homeViews/familyViews/FamilyManage.vue';
import FamilyMembers from '@/components/homeViews/familyViews/FamilyMembers.vue';
import AccountingPage from '@/components/homeViews/assetsViews/AccountingPage.vue';
import PersonalBill from '@/components/homeViews/assetsViews/PersonalBill.vue';


VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // 如果有uname信息，说明已登录，跳转到/home
      if (localStorage.getItem('uname')) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (from.name != 'Login') {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: { name: 'assets' },
    children: [
      {
        path: 'assets',
        name: 'assets',
        component: Assets
      },
      {
        path: 'family',
        name: 'family',
        component: Family
      },
      {
        path: 'mine',
        name: 'mine',
        component: Mine
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/changepasswd',
    name: 'ChangePasswd',
    component: ChangePasswd
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/familybill',
    name: 'FamilyBill',
    component: FamilyBill
  },
  {
    path: '/bindfamily',
    name: 'BindFamily',
    component: BindFamily
  },
  {
    path: '/createfamily',
    name: 'CreateFamily',
    component: CreateFamily
  },
  {
    path: '/familymanage',
    name: 'FamilyManage',
    component: FamilyManage
  },
  {
    path: '/familymembers',
    name: 'FamilyMembers',
    component: FamilyMembers
  },
  {
    path: '/acountingpage',
    name: 'AcountingPage',
    component: AccountingPage
  },
  {
    path: '/personalbill',
    name: 'PersonalBill',
    component: PersonalBill
  }
];

const router = new VueRouter({
  routes
});

export default router;
