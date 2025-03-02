export const breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1920px'
} as const;

export const media = {
  mobileS: `@media (min-width: ${breakpoints.mobileS})`,
  mobileM: `@media (min-width: ${breakpoints.mobileM})`,
  mobileL: `@media (min-width: ${breakpoints.mobileL})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  laptop: `@media (min-width: ${breakpoints.laptop})`,
  laptopL: `@media (min-width: ${breakpoints.laptopL})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
} as const;