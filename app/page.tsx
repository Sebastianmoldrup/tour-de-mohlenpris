import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Tour de Møhlenpris 2025</h1>
          <p className="text-lg">22. mars 2025 – Ein smaksrik kveld i hjartet av Bergen!</p>
        </header>

        <section aria-labelledby="intro-heading" className="mb-12 text-center">
          <h2 id="intro-heading" className="text-2xl font-semibold mb-4">Bli med på eit sosialt eventyr gjennom Møhlenpris</h2>
          <p className="mb-2">
            Tour de Møhlenpris er meir enn ein middag – det er ei oppleving! Tre rettar. Tre heimar. Éin uforgløymeleg kveld.
          </p>
          <p>
            Enten du er ny i nabolaget eller ein erfaren Møhlenprisar – dette er din sjanse til å møte nye menneske, smake på fantastisk mat og vera ein del av eit varmt og inkluderande fellesskap.
          </p>
        </section>


        <section aria-labelledby="how-heading" className="flex flex-col items-center mb-18 mt-12">
          <h2 id="how-heading" className="text-2xl font-semibold mb-10">Slik fungerer det</h2>
          <ol className="grid gap-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] justify-items-center">
            <li className="flex flex-col items-start max-w-[250px]">
              <h3 className="text-xl font-medium">1. Felles aperitiff</h3>
              <p className="mb-2">Vi startar kvelden samla – med bobler, latter og adresser.</p>
              <Image
                src="/images/aperitiff.webp"
                width={250}
                height={250}
                alt="Mennesker som skåler i vårkveld i Bergen"
                className="rounded-lg shadow-md"
              />
            </li>
            <li className="flex flex-col items-start max-w-[250px]">
              <h3 className="text-xl font-medium">2. Forrett</h3>
              <p className="mb-2">Besøk din første vert og nyt kveldens start.</p>
              <Image
                src="/images/forrett.webp"
                width={250}
                height={250}
                alt="Bord dekka til forrett med levande lys i heim"
                className="rounded-lg shadow-md"
              />
            </li>
            <li className="flex flex-col items-start max-w-[250px]">
              <h3 className="text-xl font-medium">3. Hovudrett</h3>
              <p className="mb-2">Gå vidare til neste heim for neste smaksoppleving.</p>
              <Image
                src="/images/hovedrett.webp"
                width={250}
                height={250}
                alt="Vert som serverer hovudrett til gjester i kjøkken"
                className="rounded-lg shadow-md"
              />
            </li>
            <li className="flex flex-col items-start max-w-[250px]">
              <h3 className="text-xl font-medium">4. Dessert</h3>
              <p className="mb-2">Avslutt middagsrunden hos tredje vert – søtt og sosialt.</p>
              <Image
                src="/images/dessert.webp"
                width={250}
                height={250}
                alt="Glede rundt dessertbord med kake og frukt"
                className="rounded-lg shadow-md"
              />
            </li>
            <li className="flex flex-col items-start max-w-[250px]">
              <h3 className="text-xl font-medium">5. Etterfest</h3>
              <p className="mb-2">Heile gjengen samlast igjen – for musikk, dans og nattmat.</p>
              <Image
                src="/images/etterfest.webp"
                width={250}
                height={250}
                alt="Etterfest med dans og lyslenker i nabolagslokale"
                className="rounded-lg shadow-md"
              />
            </li>
          </ol>
        </section>


        <section aria-labelledby="participate-heading" className="mb-12">
          <h2 id="participate-heading" className="text-2xl font-semibold mb-6">Vil du vere med?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Som gjest</h3>
              <p className="mb-2">For kr. 600,- får du:</p>
              <ul className="list-disc list-inside mb-2">
                <li>Ein trerettars middag med drikke</li>
                <li>Ei unik sosial oppleving</li>
                <li>Tilgang til den eksklusive etterfesten</li>
              </ul>
              <p>Alt du treng? Eit ope sinn og eit tomt vinglas!</p>
            </article>

            <article className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Som vert</h3>
              <p className="mb-2">Opne heimen din for forrett, hovudrett eller dessert. Du får:</p>
              <ul className="list-disc list-inside">
                <li>Dekka utgifter til mat</li>
                <li>Ei sosial oppleving utan like</li>
                <li>Nye bekjentskap og mykje glede</li>
              </ul>
            </article>
          </div>
        </section>

        <section aria-labelledby="signup-heading" className="text-center">
          <h2 id="signup-heading" className="text-2xl font-semibold mb-4">Meld deg på i dag!</h2>
          <p className="mb-2 text-lg font-medium">📧 <a href="mailto:tourdemohlenpris@gmail.com" className="text-blue-600 underline">tourdemohlenpris@gmail.com</a></p>
          <p className="text-gray-700">Vi treng både vertar og gjester – bli med og skap magien!</p>
        </section>
      </main>
    </>
  );
}
