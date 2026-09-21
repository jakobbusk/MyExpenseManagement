// context/BilagContext.js
// Delt state: listen over korttransaktioner og deres bilag.
//
// Bevidst valg: transaktionerne er hårdkodet, og data ligger kun i hukommelsen.
// I en rigtig version kommer transaktionerne fra bankens eller kortudstederens
// feed. Formålet med denne version er at teste flowet på rigtige brugere -
// ikke at bygge en holdbar løsning.

import { createContext, useContext, useState } from 'react';

const BilagContext = createContext(null);

// Simuleret kortfeed: posteringer fra firmakortet, som mangler et bilag.
const START_TRANSAKTIONER = [
  {
    id: '1',
    forretning: 'Circle K Valby',
    beloeb: 412.5,
    dato: '2026-09-19',
    kort: '•••• 4417',
    status: 'Mangler bilag',
    bilagUri: null,
    kategori: null,
    moms: null,
  },
  {
    id: '2',
    forretning: 'Elgiganten Fields',
    beloeb: 1299,
    dato: '2026-09-18',
    kort: '•••• 4417',
    status: 'Mangler bilag',
    bilagUri: null,
    kategori: null,
    moms: null,
  },
  {
    id: '3',
    forretning: 'Meyers Deli',
    beloeb: 268,
    dato: '2026-09-16',
    kort: '•••• 4417',
    status: 'Klar til bogføring',
    bilagUri: null,
    kategori: 'Repræsentation',
    moms: 53.6,
  },
];

// Hvem bilagene sendes til. Appen bruges enten af virksomheden selv
// ("Eget regnskab") eller udleveret af en revisor, der modtager bilagene.
// Samme flow, to modtagere - det er distributionen der adskiller dem.
const MODTAGER = 'Jensen & Partner Revision';

export function BilagProvider({ children }) {
  const [transaktioner, setTransaktioner] = useState(START_TRANSAKTIONER);
  const [modtager] = useState(MODTAGER);

  // Vedhæfter bilag og de felter AI'en (eller brugeren) har udfyldt.
  function vedhaeftBilag(id, { bilagUri, kategori, moms }) {
    setTransaktioner((tidligere) =>
      tidligere.map((t) =>
        t.id === id
          ? { ...t, bilagUri, kategori, moms, status: 'Klar til bogføring' }
          : t
      )
    );
  }

  function findTransaktion(id) {
    return transaktioner.find((t) => t.id === id);
  }

  const antalMangler = transaktioner.filter((t) => t.status === 'Mangler bilag').length;

  return (
    <BilagContext.Provider
      value={{ transaktioner, vedhaeftBilag, findTransaktion, antalMangler, modtager }}
    >
      {children}
    </BilagContext.Provider>
  );
}

export function useBilag() {
  const context = useContext(BilagContext);
  if (!context) {
    throw new Error('useBilag skal bruges inde i en BilagProvider');
  }
  return context;
}
