import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const eventItems = [
    {
      title: "Felles aperitiff",
      description: "Vi starter kvelden samlet – med bobler, latter og adresser.",
      src: "/images/aperitiff.webp",
      alt: "Mennesker som skåler i vårkveld i Bergen"
    },
    {
      title: "Forrett",
      description: "Besøk din første vert og nyt kveldens start.",
      src: "/images/forrett.webp",
      alt: "Bord dekket til forrett med levende lys i hjem"
    },
    {
      title: "Hovedrett",
      description: "Gå videre til neste hjem for neste smaksopplevelse.",
      src: "/images/hovedrett.webp",
      alt: "Vert som serverer hovedrett til gjester på kjøkken"
    },
    {
      title: "Dessert",
      description: "Avslutt middagsrunden hos tredje vert – søtt og sosialt.",
      src: "/images/dessert.webp",
      alt: "Glede rundt dessertbord med kake og frukt"
    },
    {
      title: "Etterfest",
      description: "Hele gjengen samles igjen – for musikk, dans og nattmat.",
      src: "/images/etterfest.webp",
      alt: "Etterfest med dans og lyslenker i nabolagslokale"
    }
  ];

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 my-24 text-gray-800">
        <header className="flex items-center mb-12 text-center">
          <Image src="/logo.png" width={116} height={116} alt="Tour de Møhlenpris logo" className="p-0 m-0" />
          <div className="text-start">
            <h1 className="text-4xl font-bold mb-2">Tour de Møhlenpris 2025</h1>
            <p className="text-lg">22. mars 2025 – Ein smaksrik kveld i hjartet av Bergen!</p>
          </div>
        </header>

        <section aria-labelledby="intro-heading" className="mb-12">
          <h2 id="intro-heading" className="text-2xl font-semibold mb-4">
            Bli med på et sosialt eventyr gjennom Møhlenpris
          </h2>
          <p className="mb-2">Tour de Møhlenpris er mer enn en middag – det er en opplevelse! Tre retter. Tre hjem. En uforglemmelig kveld.</p>
          <p>
            Enten du er ny i nabolaget eller en erfaren Møhlenprisar – dette er din sjanse til å møte nye mennesker, smake på fantastisk mat og være en del av et varmt og inkluderende fellesskap.
          </p>
        </section>


        <section aria-labelledby="how-heading" className="flex flex-col items-center mb-18 mt-12">
          <h2 id="how-heading" className="text-2xl font-semibold mb-10 w-full">Slik fungerer det</h2>
          <ol className="grid gap-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] justify-items-center">
            {eventItems.map((item, index) => {
              return <HowItWorks index={index + 1} key={index} title={item.title} desc={item.description} src={item.src} alt={item.alt} />
            })}
          </ol>
        </section>

        <section aria-labelledby="participate-heading" className="mb-12">
          <h2 id="participate-heading" className="text-2xl font-semibold mb-6">Vil du være med?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Som gjest</h3>
              <p className="mb-2">For kr. 600,- får du:</p>
              <ul className="list-disc list-inside mb-2">
                <li>En treretters middag med drikke</li>
                <li>En unik sosial opplevelse</li>
                <li>Tilgang til den eksklusive etterfesten</li>
              </ul>
              <p className="mb-4">Alt du trenger? Et åpent sinn og et tomt vinglass!</p>
              <Button variant={"outline"}>
                <Calendar className="" />
                Kommer snart
              </Button>
            </article>

            <article className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Som vert</h3>
              <p className="mb-2">Åpne hjemmet ditt for forrett, hovedrett eller dessert. Du får:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Dekket utgifter til mat</li>
                <li>En sosial opplevelse uten like</li>
                <li>Nye bekjentskap og mye glede</li>
              </ul>
              <Button variant={"outline"}>
                <Calendar className="" />
                Kommer snart
              </Button>
            </article>
          </div>
        </section>


        <section aria-labelledby="signup-heading" className="">
          <h2 id="signup-heading" className="text-2xl font-semibold mb-4">
            Meld deg på i dag!
          </h2>
          <p className="mb-2 text-lg font-medium">
            📧 <Link href="mailto:tourdemohlenpris@gmail.com" className="text-blue-600 underline">
              tourdemohlenpris@gmail.com
            </Link> - Vert
          </p>
          <p className="mb-2 text-lg font-medium">
            📝 <Link href="https://www.letsreg.com/no/event/tour_de_mohlenpris_30032019#init" className="text-blue-600 underline">
              Påmelding via Letsreg
            </Link> - Deltaker
          </p>
          <p className="text-gray-700">
            Vi trenger både verter og deltakere – bli med og skap magien!
          </p>
        </section>

      </main>
    </>
  );
}

function HowItWorks({ index, title, desc, src, alt }: { index: number, title: string, desc: string, src: string, alt: string }) {
  return (
    <li className="grid place-items-center relative w-[250px] h-[250px] text-white">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-lg opacity-90"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-lg z-10" />

      {/* Text on top */}
      <div className="col-start-1 row-start-1 z-20 flex flex-col justify-evenly h-full p-4">
        <h3 className="text-xl font-medium">{`${index}. ${title}`}</h3>
        <p>{desc}</p>
      </div>
    </li>
  );
}
