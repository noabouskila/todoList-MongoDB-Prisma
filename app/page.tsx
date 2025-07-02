import Image from "next/image";



export default function Home() {
  return (
    <div className="splash-container">
      <div className="left-box">
        <section>
          <h1>Bienvenue sur l'application </h1>
          <p>Une CRUD application codée dans le cadre de la formation Next.js de DonkeyGeek</p>
          <h2>Objectifs :</h2>
          <ul>
            <li>Coder un application fonctionnelle tout en revisant les concept de Next js via App Router </li>
            <li>Découvrir les BDD NoSql (MongoDb ) avant d'aborder le sql avec PostgreSql</li>
            <li>Mettre en pratique nos connaissances des Routes Handlers avec GET PATCH ET DELETE ( valeurs dynamiques) </li>
          </ul>
        </section>

      </div>
      <div className="right-box">
        <Image src="https://cdn.pixabay.com/photo/2012/04/13/00/32/snowman-31303_1280.png" alt="snowman"  width={400} height={400} />

      </div>

    </div>
  );
}
