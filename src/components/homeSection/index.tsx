"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "../ui/button";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Star,
  Quote,
  ArrowRight,
  Mic,
  Coffee,
  Network,
  Target,
} from "lucide-react";
import Link from "next/link";
import banner from "../../../public/CONFERENCELIVRES2025.png";

const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Componente para contador animado
const AnimatedCounter = ({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number | null) => {
        if (currentTime === null) return;
        if (startTime === null) startTime = currentTime;
        const progress = Math.min(
          (currentTime - (startTime ?? 0)) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export function HomeSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const speakers = [
    {
      name: "Pr. Carlos Alberto",
      role: "Pastor da PIB de Senador Lá Roque",
      topic: "Descobrindo Sua Identidade Profissional",
      image:
        "https://res.cloudinary.com/dtm6iibm2/image/upload/v1750512171/pr_carlos_h6idda.jpg",
    },
    {
      name: "Pr. Bruno Ernandes",
      role: "Pastor de jovens da PIB de imperatriz",
      topic: "O Propósito da Vida na Era Digital",
      image:
        "https://res.cloudinary.com/dtm6iibm2/image/upload/v1750512172/WhatsApp_Image_2025-06-18_at_11.23.20_qcibai.jpg",
    },
    {
      name: "Pr. Carlos Pontes",
      role: "Pastor da IB Porta Formosa",
      topic: "Transformando Paixão em Missão",
      image:
        "https://res.cloudinary.com/dtm6iibm2/image/upload/v1750512172/WhatsApp_Image_2025-06-18_at_13.29.17_bnjeir.jpg",
    },
  ];

  const testimonials = [
    {
      name: "João Victor",
      role: "Estudante de Engenharia",
      text: "A Livres Conference mudou completamente minha perspectiva sobre o futuro. Descobri minha verdadeira paixão! Cristo!!",
      rating: 5,
    },
    {
      name: "Maria",
      role: "Designer",
      text: "Três dias que transformaram minha vida. As conexões que fiz aqui são para toda a vida.",
      rating: 5,
    },
    {
      name: "Lucas",
      role: "Desenvolvedor",
      text: "Nunca imaginei que um evento pudesse ter tanto impacto. Recomendo para todos os jovens!",
      rating: 5,
    },
  ];

  const schedule = [
    {
      day: "Sexta-feira - 15/08",
      events: [
        {
          time: "19:00",
          title: "Abertura Oficial e Credenciamento",
          speaker: "Equipe Livres",
        },
        {
          time: "19:30",
          title: "Palestra: Descobrindo Sua Identidade",
          speaker: "Dr. Ana Silva",
        },
        { time: "20:30", title: "Networking e Coffee Break", speaker: "" },
      ],
    },
    {
      day: "Sábado - 16/08",
      events: [
        {
          time: "09:00",
          title: "Workshop: Mapeamento de Talentos",
          speaker: "Prof. Carlos Santos",
        },
        {
          time: "11:00",
          title: "Painel: Jovens Transformadores",
          speaker: "Convidados Especiais",
        },
        {
          time: "14:00",
          title: "Atividade Prática: Definindo Missão",
          speaker: "Mariana Costa",
        },
        {
          time: "16:00",
          title: "Mesa Redonda: Carreira e Propósito",
          speaker: "Todos os Speakers",
        },
        { time: "19:00", title: "Jantar de Confraternização", speaker: "" },
      ],
    },
    {
      day: "Domingo - 17/08",
      events: [
        {
          time: "09:00",
          title: "Meditação e Reflexão",
          speaker: "Equipe Livres",
        },
        {
          time: "10:00",
          title: "Palestra: Transformando Paixão em Missão",
          speaker: "Mariana Costa",
        },
        {
          time: "11:30",
          title: "Sessão de Mentoria Individual",
          speaker: "Todos os Speakers",
        },
        {
          time: "14:00",
          title: "Apresentação de Projetos",
          speaker: "Participantes",
        },
        {
          time: "16:00",
          title: "Encerramento e Certificação",
          speaker: "Equipe Livres",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
            >
              Livres
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "speakers",
                "schedule",
                "testimonials",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="hover:text-orange-500 transition-colors duration-300 capitalize font-medium"
                >
                  {item === "home"
                    ? "Início"
                    : item === "about"
                    ? "Sobre"
                    : item === "speakers"
                    ? "Palestrantes"
                    : item === "testimonials"
                    ? "Depoimentos"
                    : "Contato"}
                </button>
              ))}
            </nav>

            <Button
              className="md:hidden"
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1">
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  className="block w-6 h-0.5 bg-gray-800"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-gray-800"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  className="block w-6 h-0.5 bg-gray-800"
                />
              </div>
            </Button>
          </div>

          {/* Mobile Menu */}
          <motion.nav
            initial={false}
            animate={
              isMenuOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-4 pt-4 pb-4 border-t border-gray-200 mt-4">
              {[
                "home",
                "about",
                "speakers",
                "schedule",
                "testimonials",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left hover:text-orange-500 transition-colors capitalize"
                >
                  {item === "home"
                    ? "Início"
                    : item === "about"
                    ? "Sobre"
                    : item === "speakers"
                    ? "Palestrantes"
                    : item === "testimonials"
                    ? "Depoimentos"
                    : "Contato"}
                </button>
              ))}
            </div>
          </motion.nav>
        </div>
      </motion.header>

      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${banner.src}')` }}
      >
        <div className="relative z-10 text-center text-white px-4 max-w-4xl flex flex-col justify-end items-center h-full pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=""
          >
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg font-medium"
            >
              <Link href={"/register"}>Inscreva-se Agora</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <FadeInSection>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  <AnimatedCounter end={200} />+
                </div>
                <p className="text-gray-600 font-medium">Participantes</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  <AnimatedCounter end={3} />
                </div>
                <p className="text-gray-600 font-medium">Palestrantes</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  <AnimatedCounter end={3} />
                </div>
                <p className="text-gray-600 font-medium">Dias de Evento</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  <AnimatedCounter end={98} />%
                </div>
                <p className="text-gray-600 font-medium">Satisfação</p>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* About Section */}
      <FadeInSection>
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Sobre o Evento
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                A Livres Conference 2025 é um encontro transformador que une
                jovens em busca de propósito, identidade e missão. Três dias de
                inspiração, aprendizado e conexões que mudarão sua perspectiva.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Calendar,
                  title: "Data e Duração",
                  content: "15 a 17 de Agosto de 2025",
                  description:
                    "Três dias para mergulhar no extraordinário de Deus para transformar a sua vida.",
                },
                {
                  icon: Clock,
                  title: "Horários",
                  content:
                    "Sexta: 19:30\nSábado: 9:00 - 15:00 - 19:30\nDomingo: 9:00",
                  description:
                    "Programação completa com palestras, workshops e atividades práticas.",
                },
                {
                  icon: Users,
                  title: "Participantes",
                  content: "Adolescentes e jovens",
                  description:
                    "Capacidade limitada para garantir uma experiência personalizada.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 font-medium mb-2 whitespace-pre-line">
                    {item.content}
                  </p>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Como Funciona</h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mic,
                        title: "Palestras Inspiradoras",
                        description:
                          "Oradores renomados compartilhando experiências sobre identidade, propósito e missão.",
                      },
                      {
                        icon: Target,
                        title: "Workshops Práticos",
                        description:
                          "Atividades praticas para descobrir seus talentos e desenvolver habilidades práticas.",
                      },
                      {
                        icon: Network,
                        title: "Networking",
                        description:
                          "Conecte-se com jovens que compartilham da mesma visão e construa relacionamentos duradouros.",
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <step.icon className="text-white" size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-2">
                            {step.title}
                          </h4>
                          <p className="text-orange-100">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                  <h4 className="text-2xl font-bold mb-4">Tema 2025</h4>
                  <p className="text-xl mb-4 text-orange-200">
                    "Identidade e Missão"
                  </p>
                  <p className="text-orange-100">
                    Descubra quem você realmente é e qual o seu propósito único
                    neste mundo. Uma jornada de autoconhecimento que
                    transformará sua perspectiva sobre o futuro.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="speakers" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Palestrantes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Conheça os especialistas que irão compartilhar suas experiências
                e conhecimentos para ajudar você a descobrir sua identidade e
                missão.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-64 bg-gradient-to-br from-orange-400 to-red-400 relative">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {speaker.name}
                    </h3>
                    <p className="text-orange-500 font-medium mb-3">
                      {speaker.role}
                    </p>
                    <p className="text-gray-600 mb-4 font-medium">
                      {speaker.topic}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Testimonials Section */}
      <FadeInSection>
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Depoimentos
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Veja o que os participantes das edições anteriores têm a dizer
                sobre a experiência transformadora da Livres Conference.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-current"
                        size={20}
                      />
                    ))}
                  </div>
                  <Quote className="text-orange-500 mb-4" size={32} />
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Pronto para Transformar sua Vida?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto"
            >
              Não perca a oportunidade de descobrir sua identidade e missão.
              Vagas limitadas para garantir uma experiência única e
              personalizada.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
              >
                <Link href={"/register"}>Inscreva-se Agora</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* Contact Section */}
      <FadeInSection>
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Entre em Contato
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Tem dúvidas sobre o evento? Nossa equipe está pronta para ajudar
                você. Entre em contato conosco através dos canais abaixo.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "contato@livresconference.com.br",
                  description: "Resposta em até 24 horas",
                },
                {
                  icon: Phone,
                  title: "WhatsApp",
                  content: "(99) 98147-5680",
                  description: "Atendimento de 9h às 18h",
                },
                {
                  icon: Instagram,
                  title: "Redes Sociais",
                  content: "@juvlivres",
                  description: "Siga para updates do evento",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <contact.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {contact.title}
                  </h3>
                  <p className="text-gray-800 font-medium mb-2">
                    {contact.content}
                  </p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Localização
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                O evento acontecerá em um espaço moderno e aconchegante,
                especialmente preparado para proporcionar a melhor experiência.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Informações do Local
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Endereço
                        </h4>
                        <p className="text-gray-600">
                          Primeira Igreja batista de Imperatriz
                          <br />
                          Rua Hermes da Fonseca, 30
                          <br />
                          Centro - Imperatriz, MA
                          <br />
                          CEP: 65900-600
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Coffee className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Facilidades
                        </h4>
                        <p className="text-gray-600">
                          Templo climatizado, coffee break, área de networking,
                          estacionamento gratuito e acesso para pessoas com
                          deficiência.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
              >
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">Mapa do Local</p>
                  <p className="text-sm">
                    Primeira Igreja batista de Imperatriz
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                Livres
              </h3>
              <p className="text-gray-400">
                Transformando vidas através da descoberta de identidade e
                missão.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("speakers")}
                    className="hover:text-white transition-colors"
                  >
                    Palestrantes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contato@livresconference.com.br</li>
                <li>(99) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Instagram size={20} />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Facebook size={20} />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Livres Conference. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
