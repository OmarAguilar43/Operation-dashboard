import MainLayout from 'layouts/MainLayout.vue';

import DashboardPage from 'pages/DashboardPage.vue';
import RequestsPage from 'pages/RequestsPage.vue';
import NewRequestPage from 'pages/NewRequestPage.vue';
import ProfilePage from 'pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: DashboardPage },
      { path: 'requests', component: RequestsPage },
      { path: 'requests/new', component: NewRequestPage },
      { path: 'profile', component: ProfilePage },
    ],
  },
];

export default routes;
