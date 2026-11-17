// Image library. Every picture on the site is referenced by its key here,
// so replacing a stand-in photo means changing one entry.
//
// All current photos are stand-ins from Wikimedia Commons. Their licences
// require credit, which the /credits page prints from this file. When CEG's
// own photos replace them, remove the `credit` field.

export const images = {
  readingRoom: {
    src: "/images/reading-room.jpg",
    alt: "A two-storey reading room with wooden galleries and rows of desks",
    credit: { author: "Villy Fink Isaksen", licence: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Statsbiblioteket_l%C3%A6sesalen-2.jpg" },
  },
  studyHall: {
    src: "/images/study-hall.jpg",
    alt: "A reading room with long tables and chandeliers",
    credit: { author: "Guywelch2000", licence: "CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:Suzzallo_Reading_Room_University_of_Washington_restoration_Seattle_Washington_2026.jpg" },
  },
  windTurbines: {
    src: "/images/wind-turbines.jpg",
    alt: "Offshore wind turbines standing in a calm sea",
    credit: { author: "Andy Dingley", licence: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Barrow_Offshore_wind_turbines_NR.jpg" },
  },
  reservoir: {
    src: "/images/reservoir.jpg",
    alt: "A dried reservoir bed of cracked mud running to distant water",
    position: "50% 60%",
    credit: { author: "Basotxerri", licence: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Yesa_-_Embalse_-_Sequ%C3%ADa_01.jpg" },
  },
  circuitBoard: {
    src: "/images/circuit-board.jpg",
    alt: "A printed circuit board with chips and capacitors seen from above",
    credit: { author: "Mister rf", licence: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:CanoScan_5600F_main_PCB_top_view.jpg" },
  },
  siliconChip: {
    src: "/images/silicon-chip.jpg",
    alt: "The surface of a silicon chip under a microscope",
    credit: { author: "Alexander Klepnev", licence: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Silicon_chip_from_a_computer_laser_mouse_under_a_microscope_50%D1%85.jpg" },
  },
  bridgeNight: {
    src: "/images/bridge-night.jpg",
    alt: "A cable-stayed bridge lit at night over a river",
    credit: { author: "Steven Lek", licence: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Erasmusbrug_Rotterdam_night_2018.jpg" },
  },
  highway: {
    src: "/images/highway.jpg",
    alt: "An empty highway curving through open country",
    credit: { author: "DXR", licence: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Utah_State_Route_24,_Near_Mile_92_view_in_Direction_North-West_110814_2.jpg" },
  },
  evCharging: {
    src: "/images/ev-charging.jpg",
    alt: "A charging cable plugged into an electric car",
    credit: { author: "Ivan Radic", licence: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Close-up_of_an_electric_car_charging._Traffic_lights_in_a_blurry_background.jpg" },
  },
};
