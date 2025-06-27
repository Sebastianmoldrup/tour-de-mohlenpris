import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bottom-0 left-0 w-full bg-gray-900 text-gray-200 py-8 px-6 mt-16 z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Påmeldingsseksjon */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Meld deg på Tour de Møhlenpris</h2>
          <p className="mb-4">
            Vil du bli med på et sosialt og smakfullt eventyr i Møhlenpris? Send en e-post til oss, så tar vi kontakt!
          </p>
          <a
            href="mailto:tourdemohlenpris@gmail.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            📧 Send e-post
          </a>
        </div>

        {/* Logo og info */}
        <div className="w-full md:w-1/3 flex items-center gap-2 md:text-right">
          <img
            src="/logo.png"
            alt="Tour De Møhlenpris Logo"
            className="mx-auto md:mx-0 w-24"
          />
          <div className="text-left">
            <p>Tour De Møhlenpris © 2025</p>
            <p>22. mars 2025 – En smaksrik kveld i hjertet av Bergen!</p>
          </div>
        </div>
      </div>

      {/* Utviklertekst */}
      <div className="mt-8 text-center text-xs text-gray-500">
        Utviklet av
        {" "}
        <Link href="https://sebastianmoldrup.com" target="_blank" className="underline hover:text-gray-300">
          Sebastian Møldrup
        </Link>
        {" "}
        hos
        {" "}
        <Link href="https://www.effektivmarkedsforing.no" target="_blank" className="underline hover:text-gray-300">
          Effektiv Markedsføring
        </Link>
        {" "}
        - gjennom IT-utvikler fagprøven
      </div>
    </footer>
  );
}
