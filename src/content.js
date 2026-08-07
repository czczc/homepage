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

export const rndBench = [
  { name: 'LArTPC', note: 'imaging neutrinos in liquid argon' },
  { name: 'Reactor neutrinos', note: 'flux, spectra, anomalies' },
  { name: 'Cold electronics', note: 'readout that lives in the argon' },
]

// Selected publications — the list shown on https://www.bnl.gov/staff/czhang, same order.
export const publications = {
  fullList: { label: 'Full list on ORCID →', url: 'https://orcid.org/0000-0003-2298-6272' },
  selected: [
    { y: '2024', venue: 'Prog. Part. Nucl. Phys. 136',
      title: 'Reactor antineutrino flux and anomaly',
      doi: '10.1016/j.ppnp.2024.104106' },
    { y: '2023', venue: 'Phys. Rev. Lett. 130',
      title: 'Precision Measurement of Reactor Antineutrino Oscillation at Kilometer-Scale Baselines by Daya Bay',
      doi: '10.1103/PhysRevLett.130.161802' },
    { y: '2023', venue: 'Phys. Rev. Lett. 130',
      title: 'First Constraints on Light Sterile Neutrino Oscillations from Combined Appearance and Disappearance Searches with the MicroBooNE Detector',
      doi: '10.1103/PhysRevLett.130.011801' },
    { y: '2022', venue: 'Phys. Rev. Lett. 128',
      title: 'Search for an Excess of Electron Neutrino Interactions in MicroBooNE Using Multiple Final-State Topologies',
      doi: '10.1103/PhysRevLett.128.241801' },
    { y: '2022', venue: 'Phys. Rev. D 105',
      title: 'Search for an anomalous excess of inclusive charged-current νe interactions in the MicroBooNE experiment using Wire-Cell reconstruction',
      doi: '10.1103/PhysRevD.105.112005' },
    { y: '2021', venue: 'Phys. Rev. Applied 15',
      title: 'Cosmic Ray Background Rejection with Wire-Cell LArTPC Event Reconstruction in the MicroBooNE Detector',
      doi: '10.1103/PhysRevApplied.15.064071' },
    { y: '2020', venue: 'Nucl. Instrum. Meth. A 961',
      title: 'Combined Neyman–Pearson chi-square: An improved approximation to the Poisson-likelihood chi-square',
      doi: '10.1016/j.nima.2020.163677' },
    { y: '2018', venue: 'JINST 13',
      title: 'Three-dimensional imaging for large LArTPCs',
      doi: '10.1088/1748-0221/13/05/p05032' },
    { y: '2018', venue: 'Phys. Rev. Lett. 121',
      title: 'First Search for Short-Baseline Neutrino Oscillations at HFIR with PROSPECT',
      doi: '10.1103/PhysRevLett.121.251802' },
    { y: '2017', venue: 'Phys. Rev. Lett. 118',
      title: 'Evolution of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      doi: '10.1103/PhysRevLett.118.251801' },
    { y: '2016', venue: 'Phys. Rev. Lett. 116',
      title: 'Measurement of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      doi: '10.1103/PhysRevLett.116.061801' },
    { y: '2015', venue: 'Nature Commun. 6',
      title: 'Neutrino oscillation studies with reactors',
      doi: '10.1038/ncomms7935' },
    { y: '2014', venue: 'Phys. Rev. Lett. 113',
      title: 'Search for a Light Sterile Neutrino at Daya Bay',
      doi: '10.1103/PhysRevLett.113.141802' },
    { y: '2014', venue: 'Phys. Rev. Lett. 112',
      title: 'Spectral Measurement of Electron Antineutrino Oscillation Amplitude and Frequency at Daya Bay',
      doi: '10.1103/PhysRevLett.112.061801' },
    { y: '2013', venue: 'Phys. Rev. D 87',
      title: 'Reactor antineutrino anomaly with known θ13',
      doi: '10.1103/PhysRevD.87.073018' },
    { y: '2012', venue: 'Phys. Rev. Lett. 108',
      title: 'Observation of Electron-Antineutrino Disappearance at Daya Bay',
      doi: '10.1103/PhysRevLett.108.171803' },
  ],
}

export const hobbies = [
  { name: 'Cats',
    note: 'Chief morale officers — and the student body of Cat-D University, a growing catalog of AI-generated cat avatars.',
    links: [
      { label: 'Cat-D University', url: 'https://www.phy.bnl.gov/~chao/catdu/' },
      { label: 'Cat videos', url: 'https://www.youtube.com/@czczc-25' },
    ] },
  { name: 'Soccer',
    note: 'Watching the World Cup spoiler-free — I built a cat-friendly PWA for exactly that.',
    links: [
      { label: 'Cat World Cup 2026', url: 'https://czczc.github.io/fifa-wc-2026/' },
    ] },
  { name: 'Web development',
    note: 'Sites and tools I built for the browser:',
    links: [
      { label: 'Bee', url: 'https://www.phy.bnl.gov/twister/bee/' },
      { label: 'CETS', url: 'https://www.phy.bnl.gov/twister/cets/hw/' },
      { label: 'Learning Wire-Cell', url: 'https://czczc.github.io/wire-cell-tutorial/' },
    ] },
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
