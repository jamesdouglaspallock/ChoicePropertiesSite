import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, Heart } from "lucide-react";
import type { Property } from "@/lib/types";
import placeholderExterior from "@assets/generated_images/modern_luxury_home_exterior_with_blue_sky.png";
import placeholderLiving from "@assets/generated_images/bright_modern_living_room_interior.png";
import placeholderKitchen from "@assets/generated_images/modern_kitchen_with_marble_island.png";
import placeholderBedroom from "@assets/generated_images/cozy_modern_bedroom_interior.png";

// Simple image mapper for mock data
const imageMap: Record<string, string> = {
  "placeholder-exterior": placeholderExterior,
  "placeholder-living": placeholderLiving,
  "placeholder-kitchen": placeholderKitchen,
  "placeholder-bedroom": placeholderBedroom,
};

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = imageMap[property.images[0]] || placeholderExterior;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group border border-gray-200 bg-white rounded-lg">
      {/* Zillow-style image with top-left badge and top-right heart */}
      <div className="relative aspect-[1.6/1] overflow-hidden bg-gray-100">
        <Link href={`/property/${property.id}`}>
          <a className="block w-full h-full">
            <img
              src={mainImage}
              alt={property.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </a>
        </Link>
        
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 text-primary font-bold text-xs uppercase tracking-wider border border-gray-200 shadow-sm hover:bg-white">
            For Rent
          </Badge>
        </div>

        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white z-10">
          <Heart className="h-5 w-5 fill-transparent hover:fill-white stroke-2" />
        </button>

        <div className="absolute bottom-2 left-2">
             <Badge variant="secondary" className="font-semibold text-xs shadow-sm">
                {property.type}
             </Badge>
        </div>
      </div>

      <CardContent className="p-4 pb-2">
        {/* Price Line */}
        <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-bold text-gray-900">${property.price.toLocaleString()}</span>
            <span className="text-gray-600 text-sm">/mo</span>
        </div>

        {/* Stats Line */}
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-2 font-medium">
            <div className="flex items-center gap-1">
                <span className="font-bold">{property.bedrooms}</span>
                <span className="font-normal">bds</span>
            </div>
            <div className="w-px h-3 bg-gray-300"></div>
            <div className="flex items-center gap-1">
                <span className="font-bold">{property.bathrooms}</span>
                <span className="font-normal">ba</span>
            </div>
            <div className="w-px h-3 bg-gray-300"></div>
            <div className="flex items-center gap-1">
                <span className="font-bold">{property.sqft.toLocaleString()}</span>
                <span className="font-normal">sqft</span>
            </div>
        </div>

        {/* Address */}
        <div className="text-sm text-gray-600 truncate">
            {property.address}
        </div>
        <div className="text-xs text-gray-400 uppercase mt-1 font-semibold tracking-wide">
            Choice Properties
        </div>
      </CardContent>
    </Card>
  );
}
