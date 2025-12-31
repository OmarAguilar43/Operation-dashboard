<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-md">
      <div class="col-auto">
        <div class="text-h5">Requests</div>
      </div>

      <div class="col">
        <q-input dense outlined v-model="search" label="Search" debounce="300" clearable />
      </div>

      <div class="col-auto">
        <q-select
          dense
          outlined
          v-model="statusFilter"
          :options="statusOptions"
          label="Filter by status"
          style="min-width: 220px"
          emit-value
          map-options
        />
      </div>
    </div>

    <q-table
      v-if="filteredRows.length"
      flat
      bordered
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
    >
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="statusColor(props.row.status)" :label="props.row.status" />
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props" class="text-right">
          <q-btn dense flat icon="check" @click="changeStatus(props.row.id, 'APPROVED')" />
          <q-btn dense flat icon="close" @click="changeStatus(props.row.id, 'REJECTED')" />
          <q-btn dense flat icon="schedule" @click="changeStatus(props.row.id, 'PENDING')" />
        </q-td>
      </template>
    </q-table>

    <q-card v-else class="q-pa-lg text-center">
      <div class="text-h6">No results</div>
      <div class="text-caption q-mt-sm">Try ajusting filters o create a new reques</div>

      <q-btn class="q-mt-md" color="primary" label="Create a new request" @click="goToCreate" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRequestsStore, type RequestStatus, type RequestItem } from 'src/stores/requests';
import type { QTableProps } from 'quasar';
import { toast } from 'src/utils/toast';
import { useRouter } from 'vue-router';

const store = useRequestsStore();
const router = useRouter();

const statusOptions = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
] as const;

const statusFilter = ref<'ALL' | RequestStatus>('ALL');
const search = ref('');

const columns: QTableProps['columns'] = [
  { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
  { name: 'owner', label: 'Owner', field: 'owner', align: 'left', sortable: true },
  { name: 'priority', label: 'Priority', field: 'priority', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
  { name: 'createdAt', label: 'Created', field: 'createdAt', align: 'left', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
];

const filteredRows = computed<RequestItem[]>(() => {
  const base =
    statusFilter.value === 'ALL'
      ? store.items
      : store.items.filter((x) => x.status === statusFilter.value);

  const q = search.value.trim().toLowerCase();
  if (!q) return base;

  return base.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q) ||
      r.priority.toLowerCase().includes(q),
  );
});

const statusColor = (s: RequestStatus) => {
  if (s === 'APPROVED') return 'positive';
  if (s === 'REJECTED') return 'negative';
  return 'warning';
};

const changeStatus = (id: string, status: RequestStatus) => {
  const currentStatus = store.items.find((task) => task.id === id);
  if (currentStatus?.status === status) return;
  store.setStatus(id, status);

  if (status === 'APPROVED') toast('Request approved', 'positive');
  else if (status === 'REJECTED') toast('Request rejected', 'negative');
  else toast('Request set to pending', 'warning');
};

const goToCreate = async () => {
  await router.push('/requests/new');
};
</script>
