"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const productsData = [
  {
    id: 1,
    name: "KALM Asphalt Black Boxy Tee",
    color: "Hitam",
    price: 149000,
    image: "/images/kaos_hitam.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Potongan boxy fit yang kokoh, tidak menerawang, tebal, namun tetap dingin dan sangat nyaman dipakai seharian."
  },
  {
    id: 2,
    name: "KALM Stone Gray Boxy Tee",
    color: "Abu-abu",
    price: 149000,
    image: "/images/kaos_abu.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Tekstur warna abu-abu batu yang natural, solid, dan memberikan kesan raw minimalis."
  },
  {
    id: 3,
    name: "KALM Arctic White Boxy Tee",
    color: "Putih",
    price: 149000,
    image: "/images/kaos_putih.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Warna putih bersih esensial dengan potongan bahu jatuh (drop shoulder) yang sempurna."
  },
  {
    id: 4,
    name: "KALM Sage Forest Boxy Tee",
    color: "Sage Green",
    price: 149000,
    image: "/images/kaos_sage.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Warna hijau sage estetik yang teduh dan menenangkan, sangat mudah dipadupadankan."
  },
  {
    id: 5,
    name: "KALM Desert Sand Boxy Tee",
    color: "Tan",
    price: 149000,
    image: "/images/kaos_tan.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Nuansa krem pasir hangat yang kasual, memberikan getaran earthy tone yang sangat kental."
  },
  {
    id: 6,
    name: "KALM Midnight Blue Boxy Tee",
    color: "Navy Blue",
    price: 149000,
    image: "/images/kaos_navy.jpg",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Warna biru navy gelap yang dalam, memberikan kesan misterius, klasik, dan sangat rapi."
  }
];

export default function KALMLanding() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{id: string, name: string, size: string, price: number, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<{ x: number, y: number }>({ x: 50, y: 40 });
  const [logoSize, setLogoSize] = useState<number>(80);
  const [selectedCustomSize, setSelectedCustomSize] = useState<string>("M");
  
  const router = useRouter();

  useEffect(() => {
    const mockUser = {
      id: 'mock-dev-id',
      email: 'owner@kalm.com',
      user_metadata: {
        full_name: 'KALM Owner (Dev Mode)',
        avatar_url: null
      }
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-neutral-300 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user && process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCustomLogo = () => {
    setCustomLogo(null);
    setLogoPosition({ x: 50, y: 40 });
    setLogoSize(80);
  };

  const addCustomToBag = () => {
    if (!selectedCustomSize) {
      alert('Silakan pilih ukuran terlebih dahulu!');
      return;
    }
    
    const productId = `custom-design-${Date.now()}`;
    setCart([...cart, {
      id: productId,
      name: 'KALM Custom Design',
      size: selectedCustomSize,
      price: 550000, 
      quantity: 1
    }]);
    
    alert('Custom design berhasil ditambahkan ke keranjang!');
    setIsCustomStudioOpen(false);
    resetCustomLogo();
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Proses checkout di dalam website KALM (bukan WhatsApp)
    alert('Terima kasih! Sistem checkout akan segera tersedia. Untuk saat ini, silakan hubungi kami langsung via WhatsApp untuk proses pembayaran.');
  };

  return (
    <div className="bg-neutral-950 min-h-screen">
      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #e5e5e5;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: none;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .slider::-moz-range-thumb:hover {
          background: #e5e5e5;
        }
      `}</style>

      {/* Premium Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-light text-white tracking-widest">KALM</h1>
            </div>
            
            {/* Navigation Actions */}
            <div className="flex items-center gap-x-4 sm:gap-x-6 lg:gap-x-8">
              <button className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm tracking-widest font-light">
                COLLECTION
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm tracking-widest font-light">
                CUSTOM STUDIO
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm tracking-widest font-light"
              >
                CART ({cart.length})
              </button>
              <button 
                onClick={() => window.open('https://wa.me/6285864800386?text=Halo%20KALM%20Studio%2C%20saya%20tertarik%20untuk%20memesan%20produk%20boxy%20fit%20KALM.', '_blank')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-black font-semibold text-xs sm:text-sm tracking-widest rounded-none hover:bg-neutral-200 transition-colors uppercase whitespace-nowrap"
              >
                ORDER VIA WHATSAPP
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761351-9e2c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-neutral-900/50 to-transparent opacity-90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-[0.2em] mb-4">KALM</h1>
              <p className="text-base md:text-lg tracking-[0.1em]">Heavyweight Boxy Garments. Crafted for Comfort.</p>
            </div>
            
            <div className="mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 md:mb-8 leading-tight">The Art of Premium Comfort</h2>
              <p className="text-neutral-300 text-base md:text-lg mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed">
                Experience the perfect blend of comfort and style with our heavyweight cotton combed 20s. 
                Each piece is meticulously crafted to provide exceptional comfort while maintaining a sophisticated, minimalist aesthetic.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="group flex items-center space-x-3 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium transition-all duration-300 hover:bg-neutral-100 hover:scale-105">
                  <span className="text-lg">Explore Collection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => setIsCustomStudioOpen(true)}
                  className="group flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-purple-500 hover:scale-105"
                >
                  <span className="text-lg">Design Your Own</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/6285864800386?text=Halo%20KALM%20Studio%2C%20saya%20tertarik%20untuk%20memesan%20produk%20boxy%20fit%20KALM.', '_blank')}
                  className="group flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-full font-medium transition-all duration-300 hover:bg-neutral-200 hover:scale-105"
                >
                  <span className="text-lg">Order via WhatsApp</span>
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="group flex items-center space-x-3 px-8 py-4 bg-neutral-800 text-white rounded-full font-medium transition-all duration-300 hover:bg-neutral-700 hover:scale-105 relative"
                >
                  <span className="text-lg">Keranjang ({cart.length})</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full text-xs text-white flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Atas: Kita perkecil tingginya agar section di bawahnya bergeser naik ke atas */}
      <div className="h-12 sm:h-16 lg:h-20 bg-neutral-950"></div>

      {/* 35mm Mockup Showcase */}
      <section className="w-full bg-neutral-950 py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-16 md:gap-y-24">
          
          {/* Header Container */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-widest uppercase">
              KALM Studio - 35mm Film Archive
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide">
              Our design philosophy captured in premium 35mm film photography. 
              Each frame tells a story of craftsmanship, attention to detail, and the pursuit of perfection.
            </p>
          </div>
          
          {/* Editorial Product Grid */}
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {productsData.map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-xl w-full">
                  {/* Editorial Product Image */}
                  <div 
                    className="aspect-[3/4] relative overflow-hidden cursor-pointer transition-transform duration-700 ease-out group-hover:scale-105"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                      priority={false}
                    />
                                        {/* Film Frame Effect */}
                    <div className="absolute inset-x-4 inset-y-4 border border-white/10 rounded-lg"></div>
                    <div className="absolute inset-x-6 inset-y-6 border border-white/5 rounded-lg"></div>
                    <div className="absolute inset-x-8 inset-y-8 border border-white/2 rounded-lg"></div>
                    <div className="absolute top-4 left-4 text-white/60 text-xs font-mono">KALM Studio - {product.color}</div>
                  </div>
                  
                  {/* Editorial Product Details */}
                  <div className="p-8 bg-neutral-900/50 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-left">
                        <h3 
                          className="text-white font-light text-lg cursor-pointer hover:text-emerald-400 transition-colors tracking-wide"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-neutral-400 text-xs tracking-wider mt-1">Premium Series • Rp {product.price.toLocaleString('id-ID')}</p>
                      </div>
                      <button
                        onClick={() => {
                          const productId = `product-${product.id}`;
                          const existingItem = cart.find(item => item.id === productId);
                          if (existingItem) {
                            setCart(cart.filter(item => item.id !== productId));
                            const newSelectedSizes = { ...selectedSizes };
                            delete newSelectedSizes[productId];
                            setSelectedSizes(newSelectedSizes);
                          } else {
                            if (!selectedSizes[productId]) {
                              alert('Silakan pilih ukuran terlebih dahulu!');
                              return;
                            }
                            setCart([...cart, {
                              id: productId,
                              name: product.name,
                              size: selectedSizes[productId],
                              price: product.price,
                              quantity: 1
                            }]);
                          }
                        }}
                        className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                      >
                                              </button>
                    </div>
                    
                    {/* Size Selection */}
                    <div className="mb-4 text-center">
                      <p className="text-neutral-400 text-sm mb-2">Pilih Ukuran:</p>
                      <div className="flex justify-center space-x-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              const productId = `product-${product.id}`;
                              setSelectedSizes({
                                ...selectedSizes,
                                [productId]: size
                              });
                            }}
                            className={`px-3 py-2 rounded-lg border transition-colors ${
                              selectedSizes[`product-${product.id}`] === size
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-neutral-300 text-sm leading-relaxed">Frame {product.id} - Heavyweight Cotton Combed 20s</p>
                      <div className="flex items-center justify-center space-x-4 mt-2">
                        <span className="text-neutral-500 text-xs">Crafted with precision</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Bawah: Memberikan space luas sebelum menyentuh footer */}
      <div className="h-24 sm:h-32 lg:h-40 bg-neutral-950"></div>

      {/* Spacer untuk memisahkan section */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-neutral-800 to-neutral-900"></div>

      {/* Fabric Philosophy Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-[0.05em]">The Ultimate Boxy Fit</h2>
            <p className="text-neutral-400 text-lg mb-40 md:mb-48 max-w-5xl mx-auto leading-relaxed">
              Why choose between comfort and style when you can have both? 
              Our Ultimate Boxy Fit combines the best of both worlds - premium comfort with contemporary design.
            </p>
          </div>
          
          
          <div className="max-w-4xl mx-auto text-center justify-center items-center px-4" style={{ paddingTop: '120px' }}>
            <div className="grid md:grid-cols-2 gap-24 justify-items-center">
              <div className="flex flex-col items-center text-center mx-auto">
                <h3 className="text-3xl font-semibold text-white mb-6 tracking-[0.05em] text-center">Cotton Combed 20s</h3>
                <p className="text-neutral-300 leading-relaxed max-w-lg text-base text-center">
                  Maximum comfort, minimal stretch. The premium choice for those who prioritize all-day wearability without sacrificing style.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center mx-auto">
                <h3 className="text-3xl font-semibold text-white mb-6 tracking-[0.05em] text-center">The Ultimate Boxy Fit</h3>
                <p className="text-neutral-300 leading-relaxed max-w-lg text-base text-center">
                  Contemporary design meets premium comfort. Clean lines, modern fit, exceptional comfort - perfect balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer untuk memisahkan section dari footer */}
      <div className="h-16 sm:h-24 bg-neutral-900"></div>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
          <div>
            <p className="text-neutral-500 text-sm tracking-[0.05em]">© 2026 KALM Premium. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-end transition-all duration-300">
          <div className="bg-neutral-900 border-l border-white/5 h-full w-96 overflow-y-auto transform transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div className="p-6 border-b border-white/5 backdrop-blur-sm bg-neutral-900/95 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white tracking-[0.02em]">Keranjang Belanja</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-neutral-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>
            </div>
            
            {/* Cart Items */}
            <div className="p-6 pb-32">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                                    <p className="text-neutral-400 text-lg">Keranjang belanja Anda kosong</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-6 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200">
                      <div className="w-16 h-16 bg-neutral-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{item.name.charAt(item.name.length - 1)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-semibold text-base">{item.name}</p>
                            <p className="text-neutral-400 text-sm">Ukuran: <span className="font-mono text-emerald-400">{item.size}</span></p>
                            <p className="text-emerald-400 font-bold text-lg">Rp {item.price.toLocaleString('id-ID')}</p>
                          </div>
                          <button
                            onClick={() => {
                              const newCart = cart.filter(cartItem => cartItem.id !== item.id);
                              setCart(newCart);
                              const newSelectedSizes = { ...selectedSizes };
                              delete newSelectedSizes[item.id];
                              setSelectedSizes(newSelectedSizes);
                            }}
                            className="text-neutral-400 hover:text-red-400 transition-all duration-200 p-2 rounded-lg hover:bg-red-400/10"
                          >
                            <span className="text-lg">&times;</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              setCart(cart.map(cartItem => 
                                cartItem.id === item.id 
                                  ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
                                  : cartItem
                              ));
                            }}
                            className="w-10 h-10 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                          >
                            <span className="text-sm font-mono">-</span>
                          </button>
                          <span className="text-neutral-400 text-sm w-10 text-center font-mono">{item.quantity}</span>
                          <button
                            onClick={() => {
                              setCart(cart.map(cartItem => 
                                cartItem.id === item.id 
                                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                  : cartItem
                              ));
                            }}
                            className="w-10 h-10 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                          >
                            <span className="text-sm font-mono">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sticky Checkout Section */}
            <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-white/5 p-6 sticky bottom-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium text-lg">Total:</p>
                  <p className="text-emerald-400 font-bold text-2xl">
                    Rp {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Studio Modal */}
      {isCustomStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10 bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-white">KALM Custom Studio</h2>
                  <p className="text-neutral-400 text-sm">Desain kaos impian Anda secara real-time</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCustomStudioOpen(false);
                  resetCustomLogo();
                }}
                className="text-neutral-400 hover:text-white transition-all duration-200 p-3 rounded-xl hover:bg-white/10"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Mockup Preview */}
                <div className="order-1 lg:order-1">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-light text-white mb-2">Live Preview</h3>
                      <p className="text-neutral-400 text-sm">Lihat desain Anda langsung di mockup premium</p>
                    </div>
                    
                    {/* Mockup Container */}
                    <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-2xl overflow-hidden shadow-xl">
                      <div className="aspect-[4/3] relative">
                        {/* Mockup Base */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-40 h-40 bg-gradient-to-br from-neutral-600/30 to-neutral-700/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                            <span className="text-white font-bold text-4xl tracking-wider">KALM</span>
                          </div>
                        </div>
                        
                        {/* Custom Logo Overlay */}
                        {customLogo && (
                          <div 
                            className="absolute pointer-events-none transition-all duration-300 ease-out"
                            style={{
                              left: `${logoPosition.x}%`,
                              top: `${logoPosition.y}%`,
                              transform: 'translate(-50%, -50%)',
                              width: `${logoSize}px`,
                              height: 'auto'
                            }}
                          >
                            <img 
                              src={customLogo} 
                              alt="Custom Logo" 
                              className="w-full h-full object-contain drop-shadow-lg"
                              style={{ maxWidth: '180px', maxHeight: '180px' }}
                            />
                          </div>
                        )}
                        
                        {/* Mockup Frame Effect */}
                        <div className="absolute inset-x-6 inset-y-6 border border-white/10 rounded-xl"></div>
                        <div className="absolute inset-x-8 inset-y-8 border border-white/5 rounded-xl"></div>
                        <div className="absolute top-6 left-6 text-white/60 text-xs font-mono bg-black/30 px-2 py-1 rounded">KALM Custom Studio</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Control Panel */}
                <div className="w-full md:w-2/5 flex flex-col justify-between p-6 md:p-8 bg-neutral-900/50 border border-white/5 rounded-2xl min-h-[500px]">
                  <div className="space-y-8">
                    {/* Upload Logo Section */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">Upload Logo</label>
                      <div className="border border-dashed border-white/10 hover:border-white/20 rounded-xl p-5 text-center transition cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <Upload className="w-8 h-8 text-neutral-400" />
                          <span className="text-sm text-neutral-300">{customLogo ? 'Ganti Logo' : 'Pilih File Logo'}</span>
                          <span className="text-xs text-neutral-500">PNG transparan direkomendasikan</span>
                        </label>
                      </div>
                      {customLogo && (
                        <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                          <span className="text-sm">✓</span>
                          <span className="text-xs">Logo berhasil diunggah</span>
                        </div>
                      )}
                    </div>

                    {/* Ukuran Logo Section */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">Lebar Logo</label>
                        <span className="text-xs font-mono text-neutral-200 bg-white/5 px-2 py-0.5 rounded">{logoSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={logoSize}
                        onChange={(e) => setLogoSize(Number(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    {/* Atur Posisi Section */}
                    {customLogo && (
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">Posisi Logo</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-[10px] text-neutral-400 block">Horisontal (X)</span>
                            <input
                              type="range"
                              min="10"
                              max="90"
                              value={logoPosition.x}
                              onChange={(e) => setLogoPosition({ ...logoPosition, x: Number(e.target.value) })}
                              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] text-neutral-400 block">Vertikal (Y)</span>
                            <input
                              type="range"
                              min="10"
                              max="90"
                              value={logoPosition.y}
                              onChange={(e) => setLogoPosition({ ...logoPosition, y: Number(e.target.value) })}
                              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ukuran Kaos */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">Ukuran Kaos</label>
                      <div className="flex space-x-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedCustomSize(size)}
                            className={`flex-1 py-3 rounded-xl font-medium transition ${
                              selectedCustomSize === size
                                ? 'bg-purple-600 text-white'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400">Harga Estimasi</span>
                      <span className="text-2xl font-bold text-white">Rp 550.000</span>
                    </div>
                    <button
                      onClick={addCustomToBag}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition"
                    >
                      Tambahkan ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          {/* Spacer untuk jarak dari navbar */}
          <div className="h-20 sm:h-28"></div>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-4xl w-full p-8 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <div className="grid md:grid-cols-2 gap-8">
              <Image 
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                priority={false}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-light text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-emerald-400 text-xl font-bold mb-6">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                  <p className="text-neutral-300 leading-relaxed mb-6">{selectedProduct.description}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-neutral-400 text-sm block mb-2">Pilih Ukuran:</span>
                    <div className="flex space-x-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            const productId = `product-${selectedProduct.id}`;
                            setSelectedSizes({
                              ...selectedSizes,
                              [productId]: size
                            });
                          }}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedSizes[`product-${selectedProduct.id}`] === size
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const productId = `product-${selectedProduct.id}`;
                      if (!selectedSizes[productId]) {
                        alert('Silakan pilih ukuran terlebih dahulu!');
                        return;
                      }
                      setCart([...cart, {
                        id: productId,
                        name: selectedProduct.name,
                        size: selectedSizes[productId],
                        price: selectedProduct.price,
                        quantity: 1
                      }]);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition"
                  >
                    Tambahkan ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Spacer untuk jarak dari footer */}
          <div className="h-20 sm:h-28"></div>
        </div>
      )}
    </div>
  );
}