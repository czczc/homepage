// All editable site content lives here — panels read from this module.

export const identity = {
  name: 'CHAO ZHANG',
  tagline: 'Neutrino oscillation & detectors',
  fields: [
    ['POST', 'Senior Physicist'],
    ['SITE', 'BNL/510E/3-178, Upton NY'],
    ['PHD', 'Caltech, 2010'],
    ['BS', 'USTC, 2002'],
  ],
}

export const messages = [
  { t: '2015-11', lvl: 'PRIZE',
    body: 'Breakthrough Prize in Fundamental Physics (Daya Bay collaboration)' },
  { t: '2017-08', lvl: 'AWARD',
    body: 'DOE Office of Science Early Career Research Program.' },
]

export const rndBench = [
  { name: 'LArTPC', note: 'imaging neutrinos in liquid argon' },
  { name: 'Reactor neutrinos', note: 'oscillation, flux, anomalies' },
  { name: 'Cold electronics', note: 'low-noise readout' },
]

// Selected publications, reverse-chronological. topic drives the filter in the paper look.
export const publications = {
  fullList: { label: 'Full list on ORCID →', url: 'https://orcid.org/0000-0003-2298-6272' },
  selected: [
    { y: '2025', venue: 'PRD111:032007',
      title: 'Self-compensating Light Calorimetry with Liquid Argon Time Projection Chamber for GeV Neutrino Physics',
      doi: '10.1103/PhysRevD.111.032007', topic: 'argon' },
    { y: '2024', venue: 'PPNP136:104106',
      title: 'Reactor antineutrino flux and anomaly',
      doi: '10.1016/j.ppnp.2024.104106', topic: 'reactor' },
    { y: '2023', venue: 'PRL130:161802',
      title: 'Precision Measurement of Reactor Antineutrino Oscillation at Kilometer-Scale Baselines by Daya Bay',
      doi: '10.1103/PhysRevLett.130.161802', topic: 'reactor' },
    { y: '2023', venue: 'PRL130:011801',
      title: 'First Constraints on Light Sterile Neutrino Oscillations from Combined Appearance and Disappearance Searches with the MicroBooNE Detector',
      doi: '10.1103/PhysRevLett.130.011801', topic: 'argon' },
    { y: '2022', venue: 'PRL128:241801',
      title: 'Search for an Excess of Electron Neutrino Interactions in MicroBooNE Using Multiple Final-State Topologies',
      doi: '10.1103/PhysRevLett.128.241801', topic: 'argon' },
    { y: '2022', venue: 'PRD105:112005',
      title: 'Search for an anomalous excess of inclusive charged-current νe interactions in the MicroBooNE experiment using Wire-Cell reconstruction',
      doi: '10.1103/PhysRevD.105.112005', topic: 'argon' },
    { y: '2021', venue: 'PRApplied15:064071',
      title: 'Cosmic Ray Background Rejection with Wire-Cell LArTPC Event Reconstruction in the MicroBooNE Detector',
      doi: '10.1103/PhysRevApplied.15.064071', topic: 'argon' },
    { y: '2020', venue: 'NIMA961:163677',
      title: 'Combined Neyman–Pearson chi-square: An improved approximation to the Poisson-likelihood chi-square',
      doi: '10.1016/j.nima.2020.163677', topic: 'methods' },
    { y: '2018', venue: 'JINST13:P05032',
      title: 'Three-dimensional imaging for large LArTPCs',
      doi: '10.1088/1748-0221/13/05/p05032', topic: 'argon' },
    { y: '2018', venue: 'PRL121:251802',
      title: 'First Search for Short-Baseline Neutrino Oscillations at HFIR with PROSPECT',
      doi: '10.1103/PhysRevLett.121.251802', topic: 'reactor' },
    { y: '2017', venue: 'JINST12:P10002',
      title: 'Data Unfolding with Wiener-SVD Method',
      doi: '10.1088/1748-0221/12/10/P10002', topic: 'methods' },
    { y: '2017', venue: 'PRL118:251801',
      title: 'Evolution of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      doi: '10.1103/PhysRevLett.118.251801', topic: 'reactor' },
    { y: '2016', venue: 'PRL116:061801',
      title: 'Measurement of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      doi: '10.1103/PhysRevLett.116.061801', topic: 'reactor' },
    { y: '2015', venue: 'NatCommun6:6935',
      title: 'Neutrino oscillation studies with reactors',
      doi: '10.1038/ncomms7935', topic: 'reactor' },
    { y: '2014', venue: 'PRL113:141802',
      title: 'Search for a Light Sterile Neutrino at Daya Bay',
      doi: '10.1103/PhysRevLett.113.141802', topic: 'reactor' },
    { y: '2014', venue: 'PRL112:061801',
      title: 'Spectral Measurement of Electron Antineutrino Oscillation Amplitude and Frequency at Daya Bay',
      doi: '10.1103/PhysRevLett.112.061801', topic: 'reactor' },
    { y: '2013', venue: 'PRD87:073018',
      title: 'Reactor antineutrino anomaly with known θ13',
      doi: '10.1103/PhysRevD.87.073018', topic: 'reactor' },
    { y: '2012', venue: 'PRL108:171803',
      title: 'Observation of Electron-Antineutrino Disappearance at Daya Bay',
      doi: '10.1103/PhysRevLett.108.171803', topic: 'reactor' },
  ],
}

export const hobbies = [
  { name: 'Cats',
    note: 'Chief morale officers.',
    links: [
      { label: 'My YouTube Channel', url: 'https://www.youtube.com/@czczc-25' },
      { label: 'Cat University', url: 'https://www.phy.bnl.gov/~chao/catdu/' },
    ] },
  { name: 'Soccer',
    note: 'Watching the Fifa World Cup.',
    links: [
      { label: 'Cat World Cup 2026', url: 'https://czczc.github.io/fifa-wc-2026/' },
    ] },
  { name: 'Web development',
    note: 'Sites and tools I built:',
    links: [
      { label: 'NuGlass', url: 'https://czczc.github.io/nuglass/' },
      { label: 'Bee', url: 'https://www.phy.bnl.gov/twister/bee/' },
      { label: 'Hardware DB', url: 'https://www.phy.bnl.gov/twister/cets/hw/' },
      { label: 'EDG publications', url: 'https://www.phy.bnl.gov/~chao/edg-publications/' },
    ] },
]

// energy: a typical neutrino energy for the source (approximate), used by the Furrow oscillation map.
export const channels = [
  { name: 'DUNE',       src: 'ν beam',    baseline: '1300 km', energy: '≈2.5 GeV', eMeV: 2500, st: 'build', stLabel: 'BUILD',
    note: 'δCP and the mass ordering; LArTPC at 10-kt scale.' },
  { name: 'SBND',       src: 'ν beam',    baseline: '110 m', energy: '≈0.8 GeV', eMeV: 800,   st: 'run',   stLabel: 'RUN',
    note: 'SBN near detector; world’s highest-statistics ν–Ar sample.' },
  { name: 'MicroBooNE', src: 'ν beam',    baseline: '470 m', energy: '≈0.8 GeV', eMeV: 800,   st: 'done',  stLabel: 'ANALYSIS',
    note: 'Chased the low-energy excess; proved the LArTPC program.' },
  { name: 'PROSPECT',   src: 'reactor ν̄', baseline: '7-12 m', energy: '≈4 MeV', eMeV: 4,   st: 'done',  stLabel: 'COMPLETE',
    note: 'Short-baseline spectrum at HFIR; sterile-ν parameter space.' },
  { name: 'Daya Bay',   src: 'reactor ν̄', baseline: '2 km', energy: '≈4 MeV', eMeV: 4, st: 'done',  stLabel: 'COMPLETE',
    note: 'θ13 discovered at 5.2σ; Breakthrough Prize 2015.' },
  { name: 'KamLAND',    src: 'reactor ν̄', baseline: '180 km', energy: '≈4 MeV', eMeV: 4,  st: 'done',  stLabel: 'PAST',
    note: 'Reactor ν̄ disappearance; solar Δm² pinned on Earth.' },
]

export const uplinks = [
  { label: 'czhang@bnl.gov', url: 'mailto:czhang@bnl.gov' },
  { label: 'github/czczc', url: 'https://github.com/czczc' },
  { label: 'orcid', url: 'https://orcid.org/0000-0003-2298-6272' },
  { label: 'bnl.gov/staff/czhang', url: 'https://www.bnl.gov/staff/czhang' },
]

export const phone = '+1 631 344 8320'
