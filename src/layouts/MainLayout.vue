<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Startup Ops Dashboard</q-toolbar-title>
        <q-space />
        <q-btn flat dense icon="account_circle" to="/profile" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header class="text-grey-8">Navigation</q-item-label>

        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/requests">
          <q-item-section avatar><q-icon name="list_alt" /></q-item-section>
          <q-item-section>Requests</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/requests/new">
          <q-item-section avatar><q-icon name="add_circle" /></q-item-section>
          <q-item-section>New Request</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item clickable v-ripple to="/profile">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRequestsStore } from 'src/stores/requests';
import { onMounted, ref } from 'vue';

const store = useRequestsStore();

onMounted(() => {
  store.load();
});

const leftDrawerOpen = ref(true);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
</script>
