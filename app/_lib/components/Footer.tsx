export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-700">
          {/* Left Side - Credit */}
          <p className="text-sm">
            © {new Date().getFullYear()} Effektivmarkedsføring AS. All rights
            reserved.
          </p>

          {/* Center - Placeholder Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Footer Link Component
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="text-sm hover:text-blue-500 transition">
      {children}
    </a>
  );
}
