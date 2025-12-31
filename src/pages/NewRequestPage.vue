<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">New Request</div>

    <q-card flat bordered>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model="title"
            label="Title"
            outlined
            :rules="[(v) => !!v || 'Title is required']"
          />
          <q-input
            v-model="description"
            label="Description"
            type="textarea"
            outlined
            :rules="[(v) => !!v || 'Description is required']"
          />
          <q-select
            v-model="priority"
            label="Priority"
            outlined
            :options="['LOW', 'MEDIUM', 'HIGH']"
            :rules="[(v) => !!v || 'Priority is required']"
          />
          <q-input
            v-model="owner"
            label="Owner / Team"
            outlined
            :rules="[(v) => !!v || 'Owner is required']"
          />

          <div class="row justify-end">
            <q-btn label="Create" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequestsStore, type RequestPriority } from 'src/stores/requests';
import { toast } from 'src/utils/toast';

const store = useRequestsStore();
const router = useRouter();

const title = ref('');
const description = ref('');
const priority = ref<RequestPriority>('MEDIUM');
const owner = ref('Ops');

const onSubmit = async () => {
  store.create({
    title: title.value.trim(),
    description: description.value.trim(),
    priority: priority.value,
    owner: owner.value.trim(),
  });
  toast('Request created', 'positive');
  await router.push('/requests');
};
</script>
