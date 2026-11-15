import './style.css';
export const metadata = { title: 'YourTube | Independent Discovery', description: 'Your own YouTube discovery algorithm' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
