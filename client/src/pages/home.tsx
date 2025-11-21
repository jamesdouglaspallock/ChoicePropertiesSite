import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PropertyCard } from "@/components/property-card";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { ArrowRight, CheckCircle2, Search, Home as HomeIcon, Key } from "lucide-react";
import heroBg from "@assets/generated_images/modern_luxury_home_exterior_with_blue_sky.png";

export default function Home() {
  // Cast JSON data to Property type
  const properties = propertiesData as Property[];
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white space-y-6">
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Find Your Perfect <span className="text-secondary">Home</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Browse our exclusive selection of premium rental properties. 
            Simple application process, transparent pricing, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/properties">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg px-8 h-14">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14 bg-transparent">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Hand-picked selections just for you.</p>
            </div>
            <Link href="/properties">
              <Button variant="link" className="text-secondary font-semibold hidden md:flex group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/properties">
              <Button className="w-full bg-outline border-primary text-primary">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Finding your next rental is easy with Choice Properties.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">1. Search</h3>
              <p className="text-muted-foreground">
                Browse our curated list of high-quality properties. Filter by location, price, and amenities to find your match.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">2. Apply</h3>
              <p className="text-muted-foreground">
                Submit your application online in minutes. Our secure platform makes screening quick and hassle-free.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Key className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">3. Move In</h3>
              <p className="text-muted-foreground">
                Get approved and sign your lease digitally. Pick up your keys and start enjoying your new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ready to find your new home?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Browse our listings today and find the perfect property that fits your lifestyle and budget.
          </p>
          <Link href="/properties">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold h-14 px-10 text-lg">
              Start Searching Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
