import { store, CheckIn, Plan } from './state';

export function generatePlan(ci: CheckIn): Plan {
  const intensity = ci.pain >= 7 ? 'gentle' : ci.pain >= 4 ? 'moderate' : 'light';
  const exercises = [
    { id: 'mobility', name: `(${intensity}) Lumbar mobility flow`, duration: '8 min' },
    { id: 'core', name: `(${intensity}) Core activation`, duration: '6 min' },
    { id: 'breath', name: 'Breathing & relaxation', duration: '4 min' }
  ];
  const education = [{ id: 'ed1', title: 'Pain science basics (5 min)' }];
  const lifestyle = ci.sleep === 'Poor'
    ? ['Sleep hygiene tonight', 'Limit screens 1h before bed']
    : ['Posture checks hourly', 'Hydration 2L'];
  const notes = `Plan based on pain=${ci.pain}, sleep=${ci.sleep}, mood=${ci.mood}, activity=${ci.activity}.`;
  return { exercises, education, lifestyle, notes };
}
