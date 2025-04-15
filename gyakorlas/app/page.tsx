"use client";

import Card, { Cardprops } from "./card";

const kartyak: Cardprops[] = [
  {
    cim: "Cim 1",
    keszitette: {
      id: 1,
      name: "Keszito 1"
    },
    leiras: "leiras 1",
    likeok: 32,
    szin: "blue",
    datum: new Date("2021-02-05")
  },
  {
    cim: "Cim 2",
    keszitette: {
      id: 2,
      name: "Keszito 2"
    },
    leiras: "leiras 2",
    likeok: 12,
    szin: "yellow",
    datum: new Date("2021-02-15")
  },
  {
    cim: "Cim 3",
    keszitette: {
      id: 3,
      name: "Keszito 3"
    },
    leiras: "leiras 3",
    likeok: 22,
    szin: "red",
    datum: new Date("2021-02-25")
  }
]

function WelcomePage() {

  return (
    <div className="space-y-5">
      {
        kartyak.map((kartya) => (
          <Card {...kartya} key={kartya.cim} />
        ))
      }
    </div>
  )

}

export default WelcomePage;