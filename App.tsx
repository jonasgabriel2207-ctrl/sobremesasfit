
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight,
  Gift,
  Timer,
  ShoppingCart,
  Zap,
  Clock,
  Mail,
  Smartphone
} from 'lucide-react';

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  pulsing = false,
  isOfferButton = false,
  textSize = "text-[17px]"
}: { 
  children?: React.Key | React.ReactNode, 
  className?: string, 
  pulsing?: boolean,
  isOfferButton?: boolean,
  textSize?: string
}) => {
  // Link do botão de oferta obrigatório
  const targetHref = isOfferButton ? "https://pay.lowify.com.br/checkout.php?product_id=0S6sIT" : "#pricing-section";
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isOfferButton) {
      e.preventDefault();
      const element = document.getElementById('pricing-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a 
      href={targetHref}
      target={isOfferButton ? "_blank" : "_self"}
      rel={isOfferButton ? "noopener noreferrer" : ""}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-bold uppercase tracking-wide px-8 py-5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-center ${textSize} ${pulsing ? 'animate-pulse' : ''} ${className}`}
    >
      {children}
    </a>
  );
};

const SectionTitle = ({ children, subtitle, light = false, customSize = "text-3xl md:text-4xl" }: { children?: React.ReactNode, subtitle?: string, light?: boolean, customSize?: string }) => (
  <div className="text-center mb-12 px-4">
    <h2 className={`${customSize} font-extrabold uppercase mb-4 ${light ? 'text-white' : 'text-primary'}`}>
      {children}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl mx-auto font-medium ${light ? 'text-gray-100' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const Carousel = ({ images, small = false }: { images: string[], small?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative w-full mx-auto aspect-square rounded-2xl overflow-hidden bg-transparent ${small ? 'max-w-[320px]' : 'max-w-md'}`}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Receita ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-contain bg-transparent transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'} transition-all`} />
        ))}
      </div>
    </div>
  );
};

const TestimonialCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const activeItem = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeItem) {
         scrollRef.current.scrollTo({
           left: activeItem.offsetLeft - (scrollRef.current.offsetWidth / 2) + (activeItem.offsetWidth / 2),
           behavior: 'smooth'
         });
      }
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex gap-6 pb-8 snap-x no-scrollbar overflow-x-auto px-4 md:px-0 scroll-smooth"
      >
        {images.map((img, idx) => (
          <div key={idx} className="shrink-0 w-80 snap-center shadow-xl rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 transform">
            <img src={img} alt={`Depoimento ${idx}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold text-dark hover:text-primary transition-colors"
      >
        <span className="text-lg">{question}</span>
        <ChevronDown className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const recipesToLearn = [
    { title: "BOMBOM DE LIMÃO ZERO AÇÚCAR", img: "https://infostart.shop/wp-content/uploads/2026/02/Bombom-de-limao-na-travessa-que-chama-atencao-no-primeiro-olhar.webp" },
    { title: "BANOFFE FIT DE TRAVESSA", img: "https://infostart.shop/wp-content/uploads/2025/10/maxresdefault-1-2-768x432.webp" },
    { title: "BROWNIE FIT recheado", img: "https://infostart.shop/wp-content/uploads/2025/10/2e7891aa-d220-4a5e-90a8-15a04be5a51d-1.jpg" },
    { title: "PUDINS FIT", img: "https://infostart.shop/wp-content/uploads/2025/10/Design-sem-nome-3-1024x683-1-768x512.webp" },
    { title: "AMANSA SOGRA FIT", img: "https://infostart.shop/wp-content/uploads/2026/02/amansa-sogra-1.jpeg" },
    { title: "gelado de abacaxi fit", img: "https://infostart.shop/wp-content/uploads/2025/12/maxresdefault-3_compressed-1024x576.jpg" },
    { title: "Marido Gelado Fit", img: "https://infostart.shop/wp-content/uploads/2026/02/receita-de-sobremesa-marido-gelado.webp" },
  ];

  const receiptImages = [
    "https://infostart.shop/wp-content/uploads/2025/11/9-1.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/22.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/66.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/44.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/33.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/55.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/13.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/12.webp",
  ];

  const testimonials = [
    "https://infostart.shop/wp-content/uploads/2025/10/instagram-carla-souza.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/imagem.jpg",
    "https://infostart.shop/wp-content/uploads/2025/10/wpp-carla-m.webp",
    "https://infostart.shop/wp-content/uploads/2025/11/zeoob.com_idaop5aaps_photo-2.webp",
    "https://infostart.shop/wp-content/uploads/2025/09/zeoob.com_g4cex3f8mn_photo-1.webp",
  ];

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Hero Section */}
      <header className="bg-cream pt-12 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-primary text-[20px] font-extrabold leading-tight mb-6 drop-shadow-sm uppercase">
            200 SOBREMESAS NA VERSÃO <br />
            <span className="text-dark">ZERO AÇÚCAR, SEM GLÚTEN E SEM LACTOSE</span>
          </h1>
          <p className="text-[13px] text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Receitas adaptadas pela <span className="text-primary font-bold underline">Nutri Patrícia</span>, mantendo o mesmo sabor das versões tradicionais, mas em uma versão 100% saudável.
          </p>
          
          <div className="relative mb-12">
            <img 
              src="https://infostart.shop/wp-content/uploads/2025/10/Copia-de-Copia-de-GUIA-VOL-02-1.webp" 
              alt="Mockup do Guia" 
              className="w-full max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500 shadow-2xl rounded-lg"
            />
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-primary/20 max-w-2xl mx-auto mb-8">
            <p className="text-dark font-semibold text-[11px] leading-relaxed">
              Tenha acesso imediato ao maior e mais completo acervo de sobremesas saudáveis, desenvolvido e atualizado pela Nutricionista Patrícia Silva, com receitas fáceis, práticas e com o mesmo sabor das versões tradicionais.
            </p>
          </div>

          {/* Alteração 1: Bloco de preço DE / POR com cores solicitadas */}
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span className="text-[#000000]">De</span>
              <span className="text-red-600 line-through decoration-1">R$ 197,00</span>
              <span className="text-[#000000]">Por:</span>
            </div>
            <h2 className="text-success text-6xl font-black tracking-tight">R$ 27,00</h2>
            
            <Button className="bg-primary text-white py-6 shadow-2xl hover:bg-red-600 w-full md:w-auto mt-4" pulsing>
              QUERO ACESSAR AGORA
            </Button>
            
            {/* Alteração 2: Checklist ajustado abaixo do botão principal */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-dark/80 font-bold text-[13px]">
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-success" /> Pagamento Único</div>
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-success" /> Sem Mensalidade</div>
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-success" /> Acesso Vitalício</div>
            </div>
          </div>
        </div>
      </header>

      {/* What You Receive - Carousel Section (MOVED UP) */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
          <SectionTitle subtitle="Conteúdo premium cuidadosamente selecionado para o seu bem-estar.">VEJA O QUE VOCÊ VAI RECEBER:</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Carousel images={receiptImages} small={false} />
            </div>
            
            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full shrink-0"><CheckCircle className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-xl text-primary">200 RECEITAS ZERO AÇÚCAR</h4>
                  <p className="text-gray-600">Um guia completo com as melhores sobremesas do mundo em versão saudável.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full shrink-0"><CheckCircle className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-xl text-primary">SEM GLÚTEN E LACTOSE</h4>
                  <p className="text-gray-600">Perfeito para celíacos, intolerantes ou quem busca desinflamar o corpo.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full shrink-0"><CheckCircle className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-xl text-primary">ATUALIZAÇÃO SEMANAL</h4>
                  <p className="text-gray-600">Sempre novas receitas adicionadas para você nunca enjoar do cardápio.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full shrink-0"><CheckCircle className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-xl text-primary">ACESSO VITALÍCIO</h4>
                  <p className="text-gray-600">Compre uma vez e tenha acesso para sempre em qualquer dispositivo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn Grid (MOVED DOWN) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle>O Que Você Vai Aprender</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipesToLearn.map((recipe, idx) => (
              <div key={idx} className="group bg-cream rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10">
                <div className="overflow-hidden aspect-video">
                  <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-extrabold text-primary text-lg mb-2 uppercase leading-tight">{recipe.title}</h3>
                  <p className="text-gray-500 text-sm font-semibold">Zero Açúcar, Sem Glúten e Zero Lactose</p>
                </div>
              </div>
            ))}
            <div className="bg-primary flex flex-col items-center justify-center p-8 rounded-3xl text-white text-center shadow-lg">
              <span className="text-5xl mb-4">🎂</span>
              <h3 className="font-extrabold text-2xl uppercase mb-2">E MUITO MAIS!</h3>
              <p className="font-medium opacity-90">Dezenas de outras receitas exclusivas esperando por você.</p>
            </div>
          </div>
          <div className="text-center mt-12">
             <Button className="bg-primary text-white px-10 py-5 shadow-lg w-full md:w-auto">
               QUERO AS RECEITAS AGORA!
             </Button>
          </div>
        </div>
      </section>

      {/* Nutri Patricia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-cream rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center border-4 border-white">
            <div className="w-full md:w-1/2 flex justify-center p-8">
              <img 
                src="https://infostart.shop/wp-content/uploads/2025/09/5202121_7bb29636c4d00e4-768x512.jpg" 
                alt="Nutricionista Patrícia" 
                className="w-[76%] h-auto object-cover rounded-3xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-16">
              <h2 className="text-[18px] font-extrabold text-dark mb-6 leading-tight uppercase">Cardápio Feito pela Nutricionista Patrícia</h2>
              <p className="text-gray-600 text-[11px] mb-6 leading-relaxed">
                <span className="font-bold text-dark">Patrícia Silva</span>, chef especializada em alimentação funcional, criou mais de 200 receitas de sobremesas sem açúcar, sem glúten e sem lactose deliciosas de verdade e fáceis de preparar.
              </p>
              <p className="text-gray-600 text-[11px] mb-8 leading-relaxed">
                Cada receita foi desenvolvida para proporcionar sabor, leveza e saúde, mostrando que é possível se deliciar sem abrir mão do bem-estar e de uma alimentação equilibrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionTitle customSize="text-[18px]">ALÉM DISSO, VOCÊ AINDA LEVA <span className="underline">4 BÔNUS</span> EXCLUSIVOS:</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "100 Pizzas FIT Sem Glúten", value: "97,00", img: "https://infostart.shop/wp-content/uploads/2025/11/BAIXA-2.webp", b: "Bônus 01" },
              { title: "30 Marmitas FIT p/ Congelar", value: "49,90", img: "https://infostart.shop/wp-content/uploads/2025/09/maxresdefault-1-768x432.webp", b: "Bônus 02" },
              { title: "60 Sucos Detox", value: "37,00", img: "https://infostart.shop/wp-content/uploads/2025/08/confira-2-sucos-detox-para-emagrecer-e-perder-barriga-768x484.jpg", b: "Bônus 03" },
              { title: "30 Biscoitos FIT", value: "27,00", img: "https://infostart.shop/wp-content/uploads/2025/09/hq720.jpg", b: "Bônus 04" },
            ].map((bonus, idx) => (
              <div key={idx} className="relative group flex flex-col items-center bg-white rounded-3xl border-2 border-[#3BA659] p-4 transition-all hover:bg-cream/30">
                <span className="bg-[#3BA659] text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 uppercase">{bonus.b}</span>
                <img src={bonus.img} alt={bonus.title} className="w-full aspect-video object-cover rounded-2xl mb-4 shadow-md" />
                <h4 className="font-bold text-lg mb-2 uppercase">{bonus.title}</h4>
                <div className="mt-auto">
                   <p className="text-red-600 line-through text-sm font-semibold">R$ {bonus.value}</p>
                   <p className="text-[#3BA659] font-extrabold text-xl animate-pulse">HOJE É GRÁTIS!</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-[#FEF2DE] p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border-2 border-[#3BA659]/20">
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-[#3C342B]">VALOR TOTAL EM BÔNUS: <span className="text-[#FF0010] line-through">R$ 210,90</span></h3>
                <h2 className="text-4xl md:text-6xl font-extrabold uppercase animate-bounce mb-6 text-[#3C342B]">VALOR HOJE: <span className="text-[#3BA659]">GRÁTIS</span></h2>
                <Button className="bg-[#3BA659] text-white hover:opacity-90 py-6 px-12 w-full md:w-auto">
                   QUERO TUDO AGORA!
                </Button>
             </div>
             <Gift className="absolute top-1/2 -right-10 -translate-y-1/2 w-64 h-64 opacity-5 rotate-12 text-[#3BA659]" />
          </div>
        </div>
      </section>

      {/* Pain Points & Advantages */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-[#FEF2DE] p-10 rounded-[3rem] border border-white/10 flex flex-col h-full min-h-[400px]">
            <h3 className="text-2xl font-extrabold text-primary uppercase mb-8 flex items-center gap-3">
               <XCircle className="w-8 h-8 shrink-0" /> PARA PESSOAS QUE PASSAM POR:
            </h3>
            <ul className="space-y-6 flex-grow">
              {[
                "Não pode comer açúcar, glúten ou lactose",
                "Não encontra variedade de receitas zero",
                "Está enjoada de comer sempre a mesma coisa",
                "Não segue a dieta por falta de opção",
                "Engorda com receitas tradicionais calóricas"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg font-medium text-dark">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">✕</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FFFFFF] p-10 rounded-[3rem] border border-green-500/20 flex flex-col h-full min-h-[400px]">
            <h3 className="text-2xl font-extrabold text-success uppercase mb-8 flex items-center gap-3">
               <CheckCircle className="w-8 h-8 shrink-0" /> VEJA AS VANTAGENS:
            </h3>
            <ul className="space-y-6 flex-grow">
              {[
                "Preparo rápido e fácil",
                "Diversidade de sobremesas zero",
                "Criado por especialista em nutrição",
                "Baixa em calorias e saciante",
                "Ingredientes simples e acessíveis",
                "Gosto de sobremesa de verdade",
                "Baratas e econômicas"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg font-medium text-dark">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0 shadow-lg shadow-green-500/30">
                    <CheckCircle className="text-white w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-16 px-4">
          <Button className="bg-primary text-white px-12 py-6 shadow-2xl w-full md:w-auto" pulsing>
            QUERO AS RECEITAS AGORA!
          </Button>
        </div>
      </section>

      {/* Social Proof Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionTitle>VEJA O QUE DIZ QUEM ADQUIRIU:</SectionTitle>
          <TestimonialCarousel images={testimonials} />
        </div>
      </section>

      {/* Pricing / Offer Section */}
      <section id="pricing-section" className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Alteração 3: Estilização do card de oferta com fonte de 14px no checklist e topo em #FB5756 (17px) */}
          <div className="bg-white rounded-[3rem] p-8 md:p-16 border-4 border-dashed border-[#3BA659] relative overflow-hidden shadow-none">
             
             {/* Texto superior do card com cor e tamanho específicos */}
             <div className="text-[#FB5756] mb-10 font-bold uppercase tracking-widest text-[17px] text-center">
                Oferta especial disponível por tempo limitado
             </div>

             <img 
               src="https://infostart.shop/wp-content/uploads/2025/10/Copia-de-Copia-de-GUIA-VOL-02-1.webp" 
               alt="Guia Completo" 
               className="w-full max-w-xs mx-auto mb-10 transform hover:scale-110 transition-duration-500"
             />

             {/* Alteração 3: Ajuste da fonte do checklist para 14px */}
             <ul className="text-left space-y-4 max-w-lg mx-auto mb-12">
               {[
                 "+ De 200 Sobremesas Zero Açúcar, Glúten e Lactose",
                 "+ 4 Bônus Exclusivos (Somente Hoje!)",
                 "Garantia Incondicional de 7 Dias",
                 "Pagamento Único e Acesso Vitalício",
                 "Atualizações e Novos Conteúdos Gratuitos",
                 "Suporte VIP com a Equipe da Nutri"
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-3 font-bold text-dark/80 text-[14px]">
                   <CheckCircle className="w-5 h-5 text-success shrink-0" /> {item}
                 </li>
               ))}
             </ul>

             <div className="mb-10">
                <p className="text-red-600 line-through text-2xl font-bold mb-1">De R$ 197,00</p>
                <p className="text-dark text-xl font-bold mb-4 uppercase opacity-60">Por Apenas:</p>
                <h2 className="text-success text-[50px] font-black mb-2 leading-none">R$ 27,00</h2>
             </div>

             <Button 
               className="bg-[#3BA659] text-white px-16 py-8 shadow-2xl w-full hover:opacity-90" 
               pulsing 
               isOfferButton={true}
               textSize="text-[18px]"
             >
                COMPRAR AGORA
             </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-cream rounded-[3rem] p-10 md:p-16 border-4 border-dashed border-primary/20">
            <div className="mb-8">
               <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-6" />
               <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-dark mb-4 leading-tight">Risco Zero para você <br /><span className="text-primary underline">Experimente por 7 Dias!</span></h2>
            </div>
            <p className="text-xl text-gray-600 mb-0 leading-relaxed max-w-2xl mx-auto font-medium">
              Ainda não tem certeza? Não se preocupe. Se o conteúdo não for o mesmo que você receber, você tem 7 dias de garantia e devolvemos seu dinheiro sem burocracia!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle>Perguntas Frequentes</SectionTitle>
          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 shadow-inner border border-gray-100">
            {[
              { q: "As receitas realmente não têm açúcar?", a: "Sim! Todas as receitas foram desenvolvidas para serem 100% livres de açúcar refinado, utilizando substitutos saudáveis recomendados por nutricionistas." },
              { q: "Preciso ter experiência na cozinha para fazer essas receitas?", a: "Não. Todas as receitas acompanham um passo a passo extremamente detalhado e simples, ideal para quem está começando ou quem já tem experiência." },
              { q: "As receitas são todas sem glúten?", a: "Sim, todas as opções foram formuladas sem glúten, focando em farinhas funcionais e saudáveis." },
              { q: "Os ingredientes são fáceis de encontrar?", a: "Focamos em ingredientes acessíveis que você encontra em qualquer supermercado ou loja de produtos naturais comum." },
              { q: "Como vou receber o acesso ao material?", a: "O acesso é enviado imediatamente para o seu e-mail após a confirmação do pagamento. Você receberá um link único para acessar a plataforma." },
              { q: "É seguro fazer a compra?", a: "Sim, utilizamos a Lowify, uma das plataformas de pagamentos mais seguras e renomadas do Brasil, com criptografia de ponta a ponta." },
              { q: "Quais as formas de pagamento?", a: "Aceitamos Pix (liberação imediata), Cartão de Crédito (liberação imediata) e Boleto Bancário." }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Button className="bg-primary text-white px-12 py-6 shadow-2xl w-full md:w-auto" pulsing>
              QUERO AS RECEITAS AGORA!
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark text-white/50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm mb-6 leading-relaxed">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usar resultados reais para ilustrar o que você pode esperar.
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full opacity-30"></div>
          <p className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Nutricionista Patrícia © 2025 - Todos os direitos reservados</p>
          <p className="text-xs">Políticas de Privacidade | Termos de Uso</p>
        </div>
      </footer>
    </div>
  );
}
