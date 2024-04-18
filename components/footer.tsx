import { Link } from '@nextui-org/link';

const links = [
  { href: '#', text: '© 2024 Plataforma' },
  { href: '#', text: 'Política de privacidad' },
  { href: '#', text: 'Términos y condiciones' },
];

const loggedInLinks = [
  { href: '#', text: '© 2024 Plataforma. Todos los derechos reservados.' },
 ];
interface FooterProps {
  isLoggedIn: boolean;
}

export const Footer = ({ isLoggedIn }: FooterProps) => {
  const footerLinks = isLoggedIn ? loggedInLinks : links;

  return (
    <footer className="h-[100px] p-[60px] border-t border-gray-200 flex flex-col justify-center gap-6 sm:flex-row">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8 md:gap-12">
        {footerLinks.map((link) => (
          <Link
            key={link.text}
            isExternal
            className="text-center text-black dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20"
            href={link.href}
          >
            <span>{link.text}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};
