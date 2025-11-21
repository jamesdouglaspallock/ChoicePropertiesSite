import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-muted bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 hover:bg-primary text-white border-none">
            {property.type}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-bold text-xl">${property.price.toLocaleString()}/mo</p>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-border/50">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-muted-foreground mb-1">
              <Bed className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">{property.bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-border/50">
            <div className="flex items-center text-muted-foreground mb-1">
              <Bath className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">{property.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-muted-foreground mb-1">
              <Maximize className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">{property.sqft} Sq Ft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/property/${property.id}`} className="w-full">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
