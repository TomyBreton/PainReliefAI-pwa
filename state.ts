export type CheckIn = {
  pain: number;
  sleep: 'Poor' | 'Fair' | 'Good';
  mood: 'Sad' | 'Neutral' | 'Happy';
  activity: 'Low' | 'Moderate' | 'High';
};

export type Plan = {
  exercises: { id: string; name: string; duration: string }[];
  education: { id: string; title: string }[];
  lifestyle: string[];
  notes: string;
};

export const store = {
  name: '',
  checkIn: <CheckIn | null>null,
  plan: <Plan | null>null,
};

// very simple persistence
export function save() {
  localStorage.setItem('praistate', JSON.stringify(store));
}
export function load() {
  const s = localStorage.getItem('praistate');
  if (s) {
    const obj = JSON.parse(s);
    Object.assign(store, obj);
  }
}
