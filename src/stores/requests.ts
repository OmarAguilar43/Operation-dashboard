import { defineStore } from 'pinia';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RequestItem {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: RequestPriority;
  createdAt: string;
  owner: string;
}

const uid = () => Math.random().toString(16).slice(2);

const STORAGE_KEY = 'ops_requests_v1';

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    items: [] as RequestItem[],
  }),

  actions: {
    /** 🔹 Load data from localStorage (called once on app start) */
    load() {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        try {
          this.items = JSON.parse(raw);
          return;
        } catch {
          console.warn('Failed to parse stored requests');
        }
      }

      // Fallback seed data (first run)
      this.items = [
        {
          id: uid(),
          title: 'Review company application',
          description: 'Validate company documents and status',
          status: 'PENDING',
          priority: 'HIGH',
          createdAt: new Date().toISOString(),
          owner: 'Ops',
        },
        {
          id: uid(),
          title: 'Update landing copy',
          description: 'Adjust hero section messaging',
          status: 'APPROVED',
          priority: 'MEDIUM',
          createdAt: new Date().toISOString(),
          owner: 'Marketing',
        },
      ];

      this.save();
    },

    /** 🔹 Save current state to localStorage */
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    /** 🔹 Create a new request */
    create(payload: Omit<RequestItem, 'id' | 'createdAt' | 'status'>) {
      this.items.unshift({
        id: uid(),
        createdAt: new Date().toISOString(),
        status: 'PENDING',
        ...payload,
      });

      this.save();
    },

    /** Update request status */
    setStatus(id: string, status: RequestStatus) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.status = status;
        this.save();
      }
    },
  },
});
