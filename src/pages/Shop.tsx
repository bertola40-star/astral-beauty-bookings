import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ExternalLink, Star, Sparkles, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const arumProducts = [
  { id: 'arum-life', name: 'ARUM LIFE', subtitle: 'Clinical Nutricosmetic', description: 'Verisol® Collagen + NAD+ + Astaxanthin. Nourish your skin from within for a radiant, youthful glow.', category: 'Collagen Peptides', image: 'https://arumsmartfood.com/cdn/shop/files/1._HERO_486741d8-0f22-4e5c-a6f5-17f043ca97db.jpg?crop=center&height=400&v=1775608803&width=400', url: 'https://arumsmartfood.com/products/arum-life', tags: ['Collagen', 'Anti-aging', 'Skin'] },
  { id: 'arum-miicroo', name: 'ARUM MIICROO', subtitle: 'Dual Capsule Synbiotic', description: '13 Probiotic Strains + Omega 3 + Prebiotic. Gut-Brain Axis support for total wellness.', category: 'Probiotics', image: 'https://arumsmartfood.com/cdn/shop/files/1.hero_806ad89e-81c0-49e6-a471-369c6f9911ce.jpg?crop=center&height=400&v=1776404154&width=400', url: 'https://arumsmartfood.com/products/arum-miicroo', tags: ['Probiotics', 'Gut Health', 'Omega 3'] },
  { id: 'arum-fresh', name: 'ARUM FRESH', subtitle: 'Natural GLP-1 Activator', description: 'Green Detox Powder for Gut Health + Metabolic Support. Feel fresh from the inside out.', category: 'Detox & Antioxidants', image: 'https://arumsmartfood.com/cdn/shop/files/1.hero_fda73610-5667-41c4-867f-a253f7149240.jpg?crop=center&height=400&v=1775605505&width=400', url: 'https://arumsmartfood.com/products/arum-fresh', tags: ['Detox', 'Metabolism', 'Antioxidants'] },
  { id: 'arum-dfs', name: 'ARUM DFS', subtitle: 'Advanced Immune Support', description: 'Turmeric, Ganoderma & NAC formula for advanced immune and anti-inflammatory support.', category: 'Immune Support', image: 'https://arumsmartfood.com/cdn/shop/files/Arum-smartfood-DFS_2.jpg?crop=center&height=400&v=1775612076&width=400', url: 'https://arumsmartfood.com/products/arum-dfs', tags: ['Immune', 'Anti-inflammatory', 'Turmeric'] },
  { id: 'arum-vtl', name: 'ARUM VTL', subtitle: 'German Collagen Peptides', description: 'Joints, Bones & Muscles support with 98% Bioavailability. Premium German quality.', category: 'Collagen Peptides', image: 'https://arumsmartfood.com/cdn/shop/files/Arum-VTL-Smartfood_2.jpg?crop=center&height=400&v=1775613892&width=400', url: 'https://arumsmartfood.com/products/arum-vital', tags: ['Collagen', 'Joints', 'Bones'] },
  { id: 'arum-creatine', name: 'ARUM CREATINE', subtitle: 'Bioperformance Formula', description: 'Creatine 5g + Beetroot 4g + Electrolytes. Muscle & Brain Energy — no fillers.', category: 'Muscle & Recovery', image: 'https://arumsmartfood.com/cdn/shop/files/Productos_Arum_y_AllNat_products_square_size.png?crop=center&height=400&v=1771519900&width=400', url: 'https://arumsmartfood.com/products/arum-creatine', tags: ['Creatine', 'Muscle', 'Energy'] },
];

const natudermaProducts = [
  { id: 'nd-exosomes-ha', name: 'EXOSOMES-HA Rejuvenating Serum', subtitle: 'Phyto Exosomes + Hyaluronic + Niacinamide', description: 'Advanced rejuvenating serum with phyto exosomes, hyaluronic acid and niacinamide for radiant, plump skin.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2025/06/EXOSOME-HA-FACE-SERUM-3.png', url: 'https://natuderma.com/product/exosomes-niacinamide-face-serum-korean-skincare/', tags: ['Exosomes', 'Hyaluronic', 'Anti-aging'] },
  { id: 'nd-hyaluronic-serum', name: 'Hyaluronic Acid Serum', subtitle: 'Cica & Vitamin C Formula', description: 'Anti-aging hydrating face serum with Cica and Vitamin C for a glowing, youthful complexion.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-hyaluronic-acid-serum-for-face-vitamin-c-cica-1.png', url: 'https://natuderma.com/product/hyaluronic-acid-serum-for-face-vitamin-c/', tags: ['Hyaluronic', 'Vitamin C', 'Hydration'] },
  { id: 'nd-niacinamide', name: 'Niacinamide + HA Serum', subtitle: 'Rejuvenating & Barrier Repair', description: 'Powerful barrier repair serum combining Niacinamide and Hyaluronic Acid for smoother, even-toned skin.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-Niacinamide-Serum-natuderma-glow-skincare-1.png', url: 'https://natuderma.com/product/niacinamide-serum-natuderma-glow-skincare/', tags: ['Niacinamide', 'Barrier Repair', 'Even Tone'] },
  { id: 'nd-vitamin-c', name: 'Vitamin C Brightening Serum', subtitle: 'Anti-Aging + Hyaluronic Acid', description: 'Brightening face serum that fights signs of aging and illuminates the skin with powerful Vitamin C.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-Vitamin-C-Serum-for-dark-spot-1.png', url: 'https://natuderma.com/product/vitamin-c-serum-for-dark-spot/', tags: ['Vitamin C', 'Brightening', 'Anti-aging'] },
  { id: 'nd-txa5', name: 'TXA5 Advanced Brightening Serum', subtitle: 'Tranexamic + Exosomes + Niacinamide', description: 'Next-generation dark spot corrector with tranexamic acid, exosomes and niacinamide for luminous skin.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2024/11/TXA5-Tranexamic-Acid-Serum-Natuderma.png', url: 'https://natuderma.com/product/tranelux-tranexamic-acid-glutathione-brightening-face-serum-microneedling/', tags: ['Dark Spots', 'Brightening', 'Exosomes'] },
  { id: 'nd-flash-glow', name: 'FLASH GLOW24 Serum', subtitle: 'Foaming Glass Skin Serum', description: 'Instant glow daily face serum with exosomes, peptides & niacinamide for that glass skin effect.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2025/06/EXOSOME-HA-FACE-SERUM-3.png', url: 'https://natuderma.com/', tags: ['Glass Skin', 'Peptides', 'Instant Glow'] },
  { id: 'nd-wrinkle-defy', name: 'Wrinkle Defy Serum', subtitle: 'Collagen Peptides + Hyaluronic Acid', description: 'Anti-aging serum with collagen peptides and hyaluronic acid to visibly reduce fine lines.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-anti-aging-serum-peptide-hyaluronic-acid-1.png', url: 'https://natuderma.com/product/anti-aging-serum-peptide-hyaluronic-acid/', tags: ['Collagen', 'Anti-wrinkle', 'Hyaluronic'] },
  { id: 'nd-retinol-serum', name: 'Oily Skin Clarifying Serum', subtitle: 'Retinol + Lactic Acid + 11 Amino Acids', description: 'Advanced pore refiner with retinol and lactic acid for oily, acne-prone skin clarity.', category: 'Serums', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-retinol-serum-acne-treatment-1.png', url: 'https://natuderma.com/product/retinol-serum-acne-treatment-natuderma/', tags: ['Retinol', 'Lactic Acid', 'Oily Skin'] },
  { id: 'nd-vitamin-c-cream', name: 'Radiant Vitamin C Cream', subtitle: 'Luminous Even Tone & Daily Defense', description: 'Daily defense moisturizer that brightens, evens skin tone and protects against environmental stress.', category: 'Moisturizers', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-vitamin-c-cream-hyaluronic-acid-anti-aging-moisturizer-1.png', url: 'https://natuderma.com/product/vitamin-c-cream-hyaluronic-acid-anti-aging-moisturizer/', tags: ['Vitamin C', 'Even Tone', 'Daily SPF'] },
  { id: 'nd-barrier-cream', name: 'Skin Restore Barrier Rescue Cream', subtitle: 'Cica & Phyto-Defense Complex', description: 'Soothing barrier repair cream with Cica complex, perfect for sensitive or post-procedure skin.', category: 'Moisturizers', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-HYDRA-CELL-peptide-face-moisturizer-mask-1.png', url: 'https://natuderma.com/', tags: ['Cica', 'Barrier Repair', 'Sensitive'] },
  { id: 'nd-hydra-mask', name: 'Hydra-Cell+ Recovery Mask', subtitle: 'Post-Procedure Peptide & Stem Cell', description: 'Professional-grade hydrating treatment mask with peptides and stem cells for skin recovery.', category: 'Masks', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-HYDRA-CELL-peptide-face-moisturizer-mask-1.png', url: 'https://natuderma.com/product/peptide-face-moisturizer-mask/', tags: ['Peptides', 'Stem Cell', 'Recovery'] },
  { id: 'nd-peel-off', name: 'Peel-Off Jelly Face Mask', subtitle: 'For Sensitive Skin — Box of 4', description: 'Luxurious peel-off jelly mask made in France with natural ingredients. Firming and revitalizing.', category: 'Masks', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-jelly-masks-peel-off-face-mask-restorative-sensitive-violet-french-box-of-4-1.png', url: 'https://natuderma.com/product/jelly-masks-natuderma-peel-off-face-mask-restorative-sensitive-violet-french-box-of-4/', tags: ['Peel-Off', 'Made in France', 'Sensitive'] },
  { id: 'nd-sunscreen', name: 'Sunscreen SPF 50', subtitle: 'Ultra-Moisturizing Broad Spectrum', description: 'Water-resistant (80 min) SPF 50 for face and body. Lightweight, ultra-moisturizing protection.', category: 'Sun Care', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-vitamin-c-cream-hyaluronic-acid-anti-aging-moisturizer-1.png', url: 'https://natuderma.com/', tags: ['SPF 50', 'Broad Spectrum', 'Water Resistant'] },
  { id: 'nd-cleanser-ha', name: 'Hyaluronic Acid Face Wash', subtitle: 'Hydrating Gentle Cleanser + Rosewater', description: 'Gentle hydrating cleanser with rosewater that purifies without stripping the skin barrier.', category: 'Cleansers', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-face-wash-hydrating-hyaluronic-acid-cleanser-1.png', url: 'https://natuderma.com/product/face-wash-hydrating-hyaluronic-acid-cleanser/', tags: ['Hyaluronic', 'Rosewater', 'Gentle'] },
  { id: 'nd-cleanser-sa', name: 'Salicylic Acid Face Wash', subtitle: 'Clarifying + Pore Minimizer', description: 'Deep-cleansing clarifying face wash with salicylic acid for clear pores and balanced skin.', category: 'Cleansers', image: 'https://natuderma.com/wp-content/uploads/2023/04/Natuderma-salicylic-acid-face-wash-clarifying-face-cleanser-1.png', url: 'https://natuderma.com/product/salicylic-acid-face-wash-clarifying-face-cleanser-and-pore-minimizer-by-natuderma/', tags: ['Salicylic Acid', 'Pore Minimizer', 'Clarifying'] },
];

const natudermaCategories = ['All', 'Serums', 'Moisturizers', 'Masks', 'Cleansers', 'Sun Care'];
const arumCategories = ['All', 'Collagen Peptides', 'Probiotics', 'Detox & Antioxidants', 'Immune Support', 'Muscle & Recovery'];

const Shop = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const [activeTab, setActiveTab] = useState<'natuderma' | 'arum'>('natuderma');
  const [natuFilter, setNatuFilter] = useState('All');
  const [arumFilter, setArumFilter] = useState('All');

  const filteredNatu = natuFilter === 'All' ? natudermaProducts : natudermaProducts.filter(p => p.category === natuFilter);
  const filteredArum = arumFilter === 'All' ? arumProducts : arumProducts.filter(p => p.category === arumFilter);

  return (
    <>
      <Header />
      <Helmet><title>Shop — Astral Beauty Spa</title></Helmet>
      <main className="min-h-screen bg-soft-white pt-20">
        <section className="bg-primary text-pure-white py-16 text-center px-4">
          <p className="text-luxury-gold text-sm font-semibold uppercase tracking-widest mb-3">{isSpanish ? 'Tienda Oficial' : 'Official Store'}</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{isSpanish ? 'Nuestros ' : 'Our '}<span className="text-luxury-gold">{isSpanish ? 'Productos' : 'Products'}</span></h1>
          <p className="text-elegant-gray-light max-w-2xl mx-auto text-lg">{isSpanish ? 'Productos cuidadosamente seleccionados disponibles en nuestro spa en Tampa.' : 'Carefully selected products available at our Tampa spa. Ask Yoanna about availability and pricing.'}</p>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-center gap-4 mb-10">
            <button onClick={() => setActiveTab('natuderma')} className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === 'natuderma' ? 'bg-primary text-pure-white shadow-lg' : 'bg-pure-white text-primary border border-elegant-gray-light hover:border-primary'}`}>🌿 Natuderma</button>
            <button onClick={() => setActiveTab('arum')} className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === 'arum' ? 'bg-luxury-gold text-primary shadow-lg' : 'bg-pure-white text-primary border border-elegant-gray-light hover:border-luxury-gold'}`}>✨ Arum Smart Food</button>
          </div>

          {activeTab === 'natuderma' && (
            <>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-lg text-primary">Natuderma</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">Authorized Distributor · Tampa, FL</Badge>
                  </div>
                  <p className="text-elegant-gray text-sm">{isSpanish ? 'Cuidado de la piel profesional con péptidos, exosomas y biotecnología. Sin parabenos, sin gluten, libre de crueldad. Hecho en EE.UU.' : 'Professional-grade skincare powered by peptides, exosomes & biotechnology. No parabens, gluten-free, cruelty-free. Made in USA.'}</p>
                </div>
                <a href="https://natuderma.com" target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50"><ExternalLink className="h-4 w-4 mr-2" /> natuderma.com</Button></a>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {natudermaCategories.map(cat => (<button key={cat} onClick={() => setNatuFilter(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${natuFilter === cat ? 'bg-primary text-pure-white' : 'bg-pure-white text-elegant-gray border border-elegant-gray-light hover:border-primary'}`}>{cat}</button>))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNatu.map(product => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/f0fdf4/16a34a?text=Natuderma'; }} />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="bg-green-100 text-green-800 text-xs mb-2">{product.category}</Badge>
                      <h3 className="font-bold text-primary text-sm leading-tight mb-1">{product.name}</h3>
                      <p className="text-xs text-luxury-gold font-medium mb-2">{product.subtitle}</p>
                      <p className="text-xs text-elegant-gray leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">{product.tags.map(tag => (<span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>))}</div>
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-pure-white text-xs" onClick={() => window.open('https://wa.me/18135397294?text=Hi!%20I%27m%20interested%20in%20' + encodeURIComponent(product.name), '_blank')}>{isSpanish ? '💬 Consultar disponibilidad' : '💬 Ask about availability'}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === 'arum' && (
            <>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                    <span className="font-bold text-lg text-primary">Arum Smart Food</span>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Authorized Distributor · Tampa, FL</Badge>
                  </div>
                  <p className="text-elegant-gray text-sm">{isSpanish ? 'Innovación en nutrición. Suplementos plant-based con beneficios nutricosméticos para nutrir tu piel y cuerpo desde adentro.' : 'Innovation in nutrition. Plant-based supplements with nutricosmetic benefits to nourish your skin and body from within.'}</p>
                </div>
                <a href="https://arumsmartfood.com" target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50"><ExternalLink className="h-4 w-4 mr-2" /> arumsmartfood.com</Button></a>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {arumCategories.map(cat => (<button key={cat} onClick={() => setArumFilter(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${arumFilter === cat ? 'bg-luxury-gold text-primary' : 'bg-pure-white text-elegant-gray border border-elegant-gray-light hover:border-luxury-gold'}`}>{cat}</button>))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArum.map(product => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/fefce8/d97706?text=ARUM'; }} />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs mb-2">{product.category}</Badge>
                      <h3 className="font-bold text-primary text-sm leading-tight mb-1">{product.name}</h3>
                      <p className="text-xs text-luxury-gold font-medium mb-2">{product.subtitle}</p>
                      <p className="text-xs text-elegant-gray leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">{product.tags.map(tag => (<span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>))}</div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-primary text-xs" onClick={() => window.open('https://wa.me/18135397294?text=Hi!%20I%27m%20interested%20in%20' + encodeURIComponent(product.name), '_blank')}>{isSpanish ? '💬 Consultar' : '💬 Ask us'}</Button>
                        <Button size="sm" variant="outline" className="text-xs border-luxury-gold text-luxury-gold" onClick={() => window.open(product.url, '_blank')}><ExternalLink className="h-3 w-3" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
            <p className="text-primary font-semibold mb-1">{isSpanish ? '🏪 Disponible en nuestra tienda' : '🏪 Available in our spa'}</p>
            <p className="text-elegant-gray text-sm">{isSpanish ? 'Todos estos productos están disponibles en Astral Beauty Spa, 7730 Palm River Rd, Tampa, FL.' : 'All these products are available at Astral Beauty Spa, 7730 Palm River Rd, Tampa, FL. Contact us for pricing.'}</p>
            <div className="flex justify-center gap-3 mt-4">
              <Button className="btn-luxury text-sm" onClick={() => window.open('https://wa.me/18135397294', '_blank')}>💬 WhatsApp</Button>
              <Button variant="outline" className="text-sm" onClick={() => window.open('tel:8135397294')}>📞 813-539-7294</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
