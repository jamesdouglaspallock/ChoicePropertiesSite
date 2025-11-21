import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Award, Users, Shield, Home } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl font-bold text-white mb-4">About Us</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto px-4">
          Building trust and finding homes for families since 2010.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Choice Properties, we believe that finding a home should be an exciting journey, not a stressful chore. 
            Our mission is to connect people with places they love, providing transparency, quality, and exceptional service every step of the way.
            We are dedicated to raising the standard of rental living.
          </p>
        </div>

        {/* Stats/Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="p-6 bg-muted/20 rounded-xl text-center hover:bg-muted/40 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Home className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">500+</h3>
            <p className="text-muted-foreground">Properties Managed</p>
          </div>
          <div className="p-6 bg-muted/20 rounded-xl text-center hover:bg-muted/40 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">10,000+</h3>
            <p className="text-muted-foreground">Happy Tenants</p>
          </div>
          <div className="p-6 bg-muted/20 rounded-xl text-center hover:bg-muted/40 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">100%</h3>
            <p className="text-muted-foreground">Verified Listings</p>
          </div>
          <div className="p-6 bg-muted/20 rounded-xl text-center hover:bg-muted/40 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">15 Years</h3>
            <p className="text-muted-foreground">Of Excellence</p>
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded in 2010 by a team of real estate professionals who saw a gap in the rental market, Choice Properties started with a simple idea: treat tenants with the same respect as homeowners.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What began as a small portfolio of local apartments has grown into a premier property management service. We leverage technology to streamline the rental process while maintaining a personal touch that our community values.
            </p>
          </div>
          <div className="bg-muted h-[400px] rounded-2xl flex items-center justify-center">
             <img 
               src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Office Team" 
               className="w-full h-full object-cover rounded-2xl shadow-lg"
             />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
