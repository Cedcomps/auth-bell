// components/Footer.tsx

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-white py-8">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">Services</h3>
            <ul>
              <li><a href="/mobility" className="hover:underline">Mobility</a></li>
              <li><a href="/internet" className="hover:underline">Internet</a></li>
              <li><a href="/tv" className="hover:underline">TV</a></li>
              <li><a href="/smart-home" className="hover:underline">Smart Home</a></li>
              <li><a href="/home-phone" className="hover:underline">Home phone</a></li>
              <li><a href="/bundles" className="hover:underline">Bundles</a></li>
              <li><a href="/promotions" className="hover:underline">Promotions</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">À propos</h3>
            <ul>
              <li><a href="/about" className="hover:underline">À propos de Bell</a></li>
              <li><a href="/careers" className="hover:underline">Carrières</a></li>
              <li><a href="/investors" className="hover:underline">Investisseurs</a></li>
              <li><a href="/news" className="hover:underline">Nouvelles</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <ul>
              <li><a href="/contact" className="hover:underline">Contactez-nous</a></li>
              <li><a href="/stores" className="hover:underline">Magasins</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Suivez-nous</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com/BellCanada" className="hover:underline">
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Bell" className="hover:underline">
                  <Twitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/Bell" className="hover:underline">
                  <Instagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/bell-canada" className="hover:underline">
                  <Linkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Bell Canada. Tous droits réservés.</p>
          <p>
            <a href="/terms" className="hover:underline">Conditions d'utilisation</a> | 
            <a href="/privacy" className="hover:underline">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
