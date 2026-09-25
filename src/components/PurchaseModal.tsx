import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, CheckCircle, Download, BookOpen, Star } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { BONUSES } from '../data';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const { formattedPrice, convertAndFormat } = useCurrency();
  const [formData, setFormData] = useState({ name: '', email: '', cardNum: '', cardDate: '', cardCvc: '' });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Veuillez renseigner votre nom et votre adresse e-mail.');
      return;
    }
    
    setStatus('processing');
    
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        {status !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
          >
            ✕
          </button>
        )}

        {status === 'idle' && (
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">PAIEMENT 100 % SÉCURISÉ</span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight">
              Vous êtes à un clic de transformer vos entraînements
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Complétez vos coordonnées pour recevoir votre accès immédiat à la bibliothèque numérique par e-mail.
            </p>

            {/* Order Summary Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-700 font-medium">Pack +1000 Séances d'Entraînement de Football (Numérique)</span>
                <span className="text-xs text-slate-400 line-through">{convertAndFormat(420)}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600">
                <span className="text-xs font-semibold">11 Bonus Exclusifs Inclus (Vidéos, Manuels & Guides)</span>
                <span className="text-xs font-bold uppercase">OFFERT</span>
              </div>
              <div className="h-[1px] bg-slate-200 my-2" />
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm text-slate-800">Total à régler aujourd'hui :</span>
                <span
                  style={{ fontFamily: "'Arial Black', 'Montserrat', Impact, sans-serif" }}
                  className="text-2xl text-orange-500 font-black whitespace-nowrap"
                >
                  {formattedPrice}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex. Thomas Martin"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Adresse e-mail (pour la livraison immédiate)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="exemple@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Payment Methods toggle */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Moyen de paiement</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Carte bancaire
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span className="font-black italic text-sm">PayPal</span>
                  </button>
                </div>
              </div>

              {/* Card inputs (if selected) */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Numéro de carte</label>
                    <input
                      type="text"
                      name="cardNum"
                      value={formData.cardNum}
                      onChange={handleInputChange}
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Date d'expiration</label>
                      <input
                        type="text"
                        name="cardDate"
                        value={formData.cardDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Cryptogramme (CVC / CVV)</label>
                      <input
                        type="password"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info banner */}
            <div className="flex gap-2 items-start mt-6 text-[10px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p>Vos informations sont protégées par un protocole de cryptage SSL 256 bits. Transaction confidentielle et sécurisée.</p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black py-4 px-6 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-white"
            >
              FINALISER MA COMMANDE ET TÉLÉCHARGER <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === 'processing' && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h4 className="text-lg font-black text-slate-900">Sécurisation de votre transaction en cours...</h4>
            <p className="text-xs text-slate-500 mt-2 max-w-xs">
              Veuillez patienter quelques instants pendant la génération de vos accès sécurisés...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="p-6 md:p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-emerald-600 leading-tight">
              Commande Validée avec Succès !
            </h3>
            <p className="text-xs text-slate-600 mt-2 max-w-md">
              Félicitations <strong className="text-slate-800">{formData.name}</strong>, votre accès à vie à la bibliothèque est activé. Nous avons envoyé vos liens de téléchargement à <strong className="text-emerald-600">{formData.email}</strong>.
            </p>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 my-6 text-left space-y-4">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>FICHIERS PRÊTS À TÉLÉCHARGER :</span>
                <span className="text-emerald-600 font-mono">10 FICHIERS NUMÉRIQUES</span>
              </p>

              {/* Main manual */}
              <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Manuel Principal : +1000 Séances d'Entraînement de Football</p>
                    <p className="text-[10px] text-slate-400">Format PDF • 45.8 Mo</p>
                  </div>
                </div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                  title="Télécharger le fichier"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 9 Bonuses from BONUSES array */}
              {BONUSES.map((bonus) => (
                <div key={bonus.id} className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Bonus {bonus.number} : {bonus.title}</p>
                      <p className="text-[10px] text-slate-400">Format PDF • Accès direct</p>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                    title="Télécharger"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Fermer et retourner à la page d'accueil
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
