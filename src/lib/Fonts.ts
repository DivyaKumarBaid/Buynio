import {
  Dela_Gothic_One,
  Konkhmer_Sleokchher,
  Major_Mono_Display,
  Rajdhani,
  Ranga,
  Shadows_Into_Light,
} from "next/font/google";

export const major_mono_display = Major_Mono_Display({
  weight: ["400"],
  subsets: ["latin"],
});
export const dela = Dela_Gothic_One({ weight: ["400"], subsets: ["latin"] });
export const shadow = Shadows_Into_Light({
  weight: ["400"],
  subsets: ["latin"],
});
export const ranga = Ranga({ weight: ["400"], subsets: ["latin"] });
export const Konkhmer = Konkhmer_Sleokchher({ weight: ["400"], subsets: ["latin"] ,display: 'swap', adjustFontFallback: false});
export const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
