<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Dashboard</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Total Requests</div>
            <div class="text-h4">{{ total }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Pending</div>
            <div class="text-h4">{{ pending }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Approved</div>
            <div class="text-h4">{{ approved }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRequestsStore } from 'src/stores/requests';

const store = useRequestsStore();

const total = computed(() => store.items.length);
const pending = computed(() => store.items.filter((x) => x.status === 'PENDING').length);
const approved = computed(() => store.items.filter((x) => x.status === 'APPROVED').length);
</script>
