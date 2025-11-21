import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { MapPin, Bed, Bath, Maximize, Check, Share2, ArrowLeft } from "lucide-react";
import NotFound from "@/pages/not-found";
import MapView from "@/components/map-view";

// Images
import placeholderExterior from "@assets/generated_images/modern_luxury_home_exterior_with_blue_sky.png";
import placeholderLiving from "@assets/generated_images/bright_modern_living_room_interior.png";
import placeholderKitchen from "@assets/generated_images/modern_kitchen_with_marble_island.png";
import placeholderBedroom from "@assets/generated_images/cozy_modern_bedroom_interior.png";

const imageMap: Record<string, string> = {
  "placeholder-exterior": placeholderExterior,
  "placeholder-living": placeholderLiving,
  "placeholder-kitchen": placeholderKitchen,
  "placeholder-bedroom": placeholderBedroom,
};

export default function PropertyDetails() {
  const [match, params] = useRoute("/property/:id");
  const id = params?.id;
  const property = (propertiesData as Property[]).find(p => p.id === id);

  if (!match || !property) {
    return <NotFound />;
  }

  // Mock coordinates for demo (would come from DB in real app)
  // Randomize slightly around a central point based on ID
  const baseLat = 34.0522;
  const baseLng = -118.2437;
  const offset = parseInt(property.id) * 0.01;
  const position: [number, number] = [baseLat + offset, baseLng - offset];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link href="/properties">
          <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="rounded-xl overflow-hidden border bg-muted/10" data-aos="fade-up">
              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((imgKey, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative">
                        <img 
                          src={imageMap[imgKey] || placeholderExterior} 
                          alt={`${property.title} - Image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            {/* Title & Address */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary">{property.type}</Badge>
                    {property.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <h1 className="font-heading text-3xl font-bold text-primary">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mt-2 text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-secondary" />
                    {property.address}
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-3xl font-bold text-primary">${property.price.toLocaleString()}<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="200">
              <div className="flex flex-col items-center p-4 bg-muted/20 rounded-lg">
                <Bed className="h-6 w-6 text-primary mb-2" />
                <span className="font-bold text-lg">{property.bedrooms}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/20 rounded-lg">
                <Bath className="h-6 w-6 text-primary mb-2" />
                <span className="font-bold text-lg">{property.bathrooms}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/20 rounded-lg">
                <Maximize className="h-6 w-6 text-primary mb-2" />
                <span className="font-bold text-lg">{property.sqft}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Square Ft</span>
              </div>
            </div>

            {/* Description */}
            <div data-aos="fade-up" data-aos-delay="300">
              <h2 className="font-heading text-xl font-bold mb-4">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h2 className="font-heading text-xl font-bold mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3 text-secondary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div data-aos="fade-up" data-aos-delay="500">
              <h2 className="font-heading text-xl font-bold mb-4">Location</h2>
              <MapView 
                center={position} 
                zoom={14}
                markers={[{ position, title: property.title, description: property.address }]}
                className="h-[300px] w-full rounded-xl"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6" data-aos="fade-left" data-aos-delay="600">
            <Card className="sticky top-24 border-2 border-primary/10 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Rent per month</p>
                  <p className="text-4xl font-bold text-primary">${property.price.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                  <Link href={`/apply?propertyId=${property.id}`}>
                    <Button className="w-full h-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                      Apply Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-12 text-lg border-primary text-primary hover:bg-primary/5">
                    Schedule Viewing
                  </Button>
                </div>

                <Separator />

                <div className="text-sm text-muted-foreground text-center">
                  <p>Have questions?</p>
                  <p className="font-medium text-primary mt-1">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
