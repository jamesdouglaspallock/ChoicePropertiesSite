import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PropertyCard } from "@/components/property-card";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { ArrowRight, CheckCircle2, Users, Home as HomeIcon, MapPin, ShieldCheck } from "lucide-react";
import heroBg from "@assets/generated_images/modern_luxury_home_exterior_with_blue_sky.png";

export default function Home() {
  // Cast JSON data to Property type
  const properties = propertiesData as Property[];
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background/90 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white space-y-8 max-w-4xl">
          <div data-aos="fade-down">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
              Find the home that <span className="text-secondary">fits your life</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light">
              Your Trusted Rental Housing Partner
            </p>
          </div>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            At Choice Properties, we are dedicated to solving one of life’s most important needs—finding a place you can truly call home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6" data-aos="fade-up" data-aos-delay="400">
            <Link href="/properties">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg px-10 h-14 shadow-xl hover:scale-105 transition-transform">
                Browse Rentals
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-10 h-14 bg-transparent hover:scale-105 transition-transform">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">Why Renters Choose Choice Properties</h2>
            <p className="text-muted-foreground text-lg">
              We streamline communication between renters, property owners, leasing agents, and property managers—ensuring a smooth and transparent approval process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle2 className="h-10 w-10 text-secondary" />,
                title: "Fast & Easy Process",
                description: "We streamline communication for a smooth and transparent approval process."
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
                title: "High Approval Rates",
                description: "We work with landlords who understand real life. Even with credit challenges, we help you find options."
              },
              {
                icon: <HomeIcon className="h-10 w-10 text-secondary" />,
                title: "Every Lifestyle",
                description: "From affordable apartments to spacious homes, we offer rental opportunities for everyone."
              },
              {
                icon: <MapPin className="h-10 w-10 text-secondary" />,
                title: "Nationwide Coverage",
                description: "Our network spans multiple states and cities, giving you access to hundreds of rentals."
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="mb-6 p-4 rounded-full bg-primary/5 w-fit group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help Banner */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Who We Help</h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                We specialize in matching renters with properties that fit their lifestyle, budget, and needs. 
                Wherever you are in the USA, Choice Properties is ready to pair you with a home that’s right for you.
              </p>
              <ul className="space-y-4">
                {[
                  "Working professionals",
                  "Families and single parents",
                  "Students & First-time renters",
                  "Relocating individuals",
                  "Renters rebuilding credit",
                  "Those seeking second-chance housing"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg font-medium">
                    <CheckCircle2 className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Happy family moving in" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-secondary text-primary-foreground p-6 rounded-xl shadow-xl hidden md:block">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm font-semibold uppercase tracking-wider">Verified Listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12" data-aos="fade-up">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">Featured Properties</h2>
              <p className="text-muted-foreground text-lg">Hand-picked selections just for you.</p>
            </div>
            <Link href="/properties">
              <Button variant="link" className="text-secondary font-bold text-lg hidden md:flex group">
                View All Listings <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/properties">
              <Button className="w-full bg-outline border-primary text-primary h-12 font-bold">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div data-aos="zoom-in">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">Your next rental starts here.</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              We don’t just list properties—we guide you through the entire process. 
              From viewing a home to getting your application approved, we’re with you every step of the way.
            </p>
            <Link href="/properties">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold h-16 px-12 text-xl shadow-lg hover:shadow-xl transition-all">
                Start Searching Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
