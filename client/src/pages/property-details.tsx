import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { MapPin, Bed, Bath, Maximize, Check, Share2, Heart, MoreHorizontal, Calendar, Info } from "lucide-react";
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

  const mainImage = imageMap[property.images[0]] || placeholderExterior;
  const secondaryImages = property.images.slice(1).map(img => imageMap[img] || placeholderExterior);

  // Mock coordinates
  const baseLat = 34.0522;
  const baseLng = -118.2437;
  const offset = parseInt(property.id) * 0.01;
  const position: [number, number] = [baseLat + offset, baseLng - offset];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Zillow-style Sticky Sub-nav (Optional, can simplify to just standard layout) */}
      
      {/* Media Grid - 1 Large, grid of smaller */}
      <div className="max-w-[1400px] mx-auto w-full p-2 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            {/* Main Image */}
            <div className="md:col-span-2 h-full relative group cursor-pointer">
                <img src={mainImage} alt="Main" className="w-full h-full object-cover hover:brightness-105 transition-all" />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-bold">
                    {property.images.length} Photos
                </div>
            </div>
            {/* Side Grid */}
            <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-2 md:col-span-2 h-full">
                {/* Top Row in Side */}
                <div className="relative h-full">
                     <img src={secondaryImages[0] || placeholderLiving} alt="Interior" className="w-full h-full object-cover hover:brightness-105 transition-all" />
                </div>
                {/* Bottom Row in Side (Split) */}
                <div className="grid grid-cols-2 gap-2 h-full">
                    <img src={secondaryImages[1] || placeholderKitchen} alt="Kitchen" className="w-full h-full object-cover hover:brightness-105 transition-all" />
                    <img src={secondaryImages[2] || placeholderBedroom} alt="Bedroom" className="w-full h-full object-cover hover:brightness-105 transition-all" />
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 max-w-[1200px] py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Property Info */}
            <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                         <div className="flex items-baseline gap-3 mb-1">
                            <h1 className="text-4xl font-bold text-gray-900">${property.price.toLocaleString()}</h1>
                            <span className="text-xl text-gray-600">/mo</span>
                        </div>
                        <div className="flex items-center gap-6 text-lg text-gray-900 font-medium mb-2">
                            <span className="flex items-center gap-1"><strong>{property.bedrooms}</strong> <span className="text-gray-600 font-normal">bd</span></span>
                            <span className="flex items-center gap-1"><strong>{property.bathrooms}</strong> <span className="text-gray-600 font-normal">ba</span></span>
                            <span className="flex items-center gap-1"><strong>{property.sqft.toLocaleString()}</strong> <span className="text-gray-600 font-normal">sqft</span></span>
                        </div>
                        <p className="text-gray-600 text-lg">{property.address}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-primary border-primary hover:bg-primary/5 gap-2">
                            <Heart className="h-4 w-4" /> Save
                        </Button>
                        <Button variant="outline" className="text-primary border-primary hover:bg-primary/5 gap-2">
                            <Share2 className="h-4 w-4" /> Share
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {property.description}
                    </p>
                </div>

                {/* Facts & Features */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Facts and features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                        <div className="flex gap-3 items-start">
                            <div className="mt-1"><Bed className="h-5 w-5 text-gray-500" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Bedrooms</p>
                                <p className="text-gray-600 text-sm">{property.bedrooms}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="mt-1"><Bath className="h-5 w-5 text-gray-500" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Bathrooms</p>
                                <p className="text-gray-600 text-sm">{property.bathrooms}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="mt-1"><Maximize className="h-5 w-5 text-gray-500" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Square Footage</p>
                                <p className="text-gray-600 text-sm">{property.sqft}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="mt-1"><Calendar className="h-5 w-5 text-gray-500" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Year Built</p>
                                <p className="text-gray-600 text-sm">2021</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="mt-1"><Info className="h-5 w-5 text-gray-500" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Property Type</p>
                                <p className="text-gray-600 text-sm">{property.type}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Amenities</h3>
                        <div className="flex flex-wrap gap-3">
                            {property.features.map((feature, i) => (
                                <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm py-1 px-3 font-normal">
                                    {feature}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Map */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Map</h2>
                    <MapView 
                        center={position}
                        zoom={15}
                        markers={[{position, title: property.title, description: property.address}]}
                        className="h-[300px] w-full rounded-lg border"
                    />
                </div>
            </div>

            {/* RIGHT COLUMN: Sticky Contact Card */}
            <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-primary p-4 text-white text-center">
                        <h3 className="font-bold text-lg">Request a Tour</h3>
                        <p className="text-primary-foreground/80 text-sm">As early as today at 3:00 pm</p>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <Button variant="outline" className="border-gray-300 hover:border-primary hover:text-primary hover:bg-blue-50 font-semibold h-12">
                                In-Person
                            </Button>
                            <Button variant="outline" className="border-gray-300 hover:border-primary hover:text-primary hover:bg-blue-50 font-semibold h-12">
                                Video Chat
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <Input placeholder="Name" className="bg-gray-50 border-gray-200" />
                            <Input placeholder="Phone" className="bg-gray-50 border-gray-200" />
                            <Input placeholder="Email" className="bg-gray-50 border-gray-200" />
                            <Textarea placeholder="I am interested in this property..." className="bg-gray-50 border-gray-200 h-24" />
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-12 text-lg mt-2">
                            Request a Tour
                        </Button>

                        <div className="flex items-center gap-2 my-4">
                             <div className="h-px bg-gray-200 flex-1"></div>
                             <span className="text-xs text-gray-400 uppercase font-bold">or</span>
                             <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                         <Link href={`/apply?propertyId=${property.id}`}>
                            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-bold h-12">
                                Start Application
                            </Button>
                         </Link>
                         
                         <p className="text-xs text-gray-400 text-center mt-4">
                             By pressing Request a Tour, you agree that Zillow Group and its affiliates, and real estate professionals may call/text you about your inquiry.
                         </p>
                    </CardContent>
                </Card>
            </div>

        </div>
      </div>
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
