import { Menu } from 'lucide-react';
import Button from '../components/Button';
import logo from '../assets/Logo.png';

export default function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} alt="Logo" className="h-6" />
        </a>
      </div>
      <div></div>
      <div></div>
    </div>
  ) 
}