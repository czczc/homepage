// All editable site content lives here — panels read from this module.

export const identity = {
  name: 'CHAO ZHANG',
  tagline: 'Neutrino oscillation & detectors',
  fields: [
    ['POST', 'Senior Physicist'],
    ['SITE', 'Bldg 510E / 3-178, Upton NY'],
    ['PHD', 'Caltech, 2010'],
    ['BS', 'USTC, 2002'],
  ],
}

export const messages = [
  { t: '2015-11', lvl: 'PRIZE',
    body: 'Breakthrough Prize in Fundamental Physics — Daya Bay collaboration, discovery of θ13.' },
  { t: '2017-08', lvl: 'AWARD',
    body: 'DOE Office of Science Early Career Research Program.' },
]

export const rndBench =
  'Liquid argon time projection chambers. Water-based liquid scintillator. ' +
  'The readout electronics between a particle and its picture.'

export const projects = [
  { name: 'Bee', url: 'https://www.phy.bnl.gov/twister/bee/', stack: 'three.js',
    note: '3D event display for Wire-Cell reconstruction, used across the LArTPC experiments. Source of the events above.' },
  { name: 'CETS', url: 'https://www.phy.bnl.gov/twister/cets/hw/', stack: 'Django · HTMX',
    note: 'Cold Electronics Tracking System — Hardware DB explorer for detector cold electronics.' },
  { name: 'Cat-D University', url: 'https://www.phy.bnl.gov/~chao/catdu/', stack: 'Vue · Vite',
    note: 'A growing catalog of AI-generated cat avatars, organized by school and department, like a university.' },
]

export const channels = [
  { name: 'DUNE',       src: 'ν beam',    baseline: '1300 km', st: 'build', stLabel: 'BUILD',
    note: 'δCP and the mass ordering; LArTPC at 10-kt scale.' },
  { name: 'SBND',       src: 'ν beam',    baseline: '110 m',   st: 'run',   stLabel: 'RUN',
    note: 'SBN near detector; world’s highest-statistics ν–Ar sample.' },
  { name: 'MicroBooNE', src: 'ν beam',    baseline: '470 m',   st: 'done',  stLabel: 'ANALYSIS',
    note: 'Chased the low-energy excess; proved the LArTPC program.' },
  { name: 'PROSPECT',   src: 'reactor ν̄', baseline: '7.9 m',   st: 'done',  stLabel: 'COMPLETE',
    note: 'Short-baseline spectrum at HFIR; sterile-ν parameter space.' },
  { name: 'Daya Bay',   src: 'reactor ν̄', baseline: '1.65 km', st: 'done',  stLabel: 'COMPLETE',
    note: 'θ13 discovered at 5.2σ; Breakthrough Prize 2015.' },
  { name: 'KamLAND',    src: 'reactor ν̄', baseline: '180 km',  st: 'done',  stLabel: 'PAST',
    note: 'Reactor ν̄ disappearance; solar Δm² pinned on Earth.' },
]

export const uplinks = [
  { label: 'czhang@bnl.gov', url: 'mailto:czhang@bnl.gov' },
  { label: 'github/czczc', url: 'https://github.com/czczc' },
  { label: 'orcid', url: 'https://orcid.org/0000-0003-2298-6272' },
  { label: 'bnl.gov/staff/czhang', url: 'https://www.bnl.gov/staff/czhang' },
]

export const phone = '+1 631 344 8320'
