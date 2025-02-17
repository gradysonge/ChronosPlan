export const professors = [
  { id: 'P1', code: 'ELOS', name: 'Samir Elouasbi' },
  { id: 'P2', code: 'DUPR', name: 'Grady Songe' },
  { id: 'P3', code: 'MART', name: 'David Basola' },
  { id: 'P4', code: 'MART', name: 'Charles Emma' },
  // ... add up to 20 professors
].map(prof => ({
  ...prof,
  avatar: `https://i.pravatar.cc/150?u=${prof.id}`
}));

export const courses = [
  { code: 'MAT1234', name: 'Mathématiques ' },
  { code: 'INF1120', name: 'Programmation I' },
  { code: 'INF2120', name: 'Programmation II' },
  { code: 'INF3190', name: 'Introduction à la programmation Web' },
  { code: 'INF4170', name: 'Architecture des ordinateurs' },
];

export const steps = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Étape ${i + 1}`
}));