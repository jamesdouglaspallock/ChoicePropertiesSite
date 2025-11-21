import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MapView from "@/components/map-view";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { Search } from "lucide-react";

export default function Properties() {
  const allProperties = propertiesData as Property[];
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  
  // Filters
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");
  const [homeType, setHomeType] = useState("any");

  useEffect(() => {
    let result = allProperties;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.address.toLowerCase().includes(query)
      );
    }

    if (priceMax !== "any") {
      result = result.filter(p => p.price <= parseInt(priceMax));
    }

    if (bedrooms !== "any") {
      result = result.filter(p => p.bedrooms >= parseInt(bedrooms));
    }

    if (homeType !== "any") {
        result = result.filter(p => p.type === homeType);
    }

    setFilteredProperties(result);
  }, [search, priceMax, bedrooms, homeType, allProperties]);

  // Mock map markers
  const mapMarkers = filteredProperties.map(p => {
      const offset = parseInt(p.id) * 0.005;
      return {
          position: [34.0522 + offset, -118.2437 - offset] as [number, number],
          title: `$${p.price.toLocaleString()}`,
          description: p.address
      }
  });

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      
      {/* Zillow-style Subheader Filter Bar */}
      <div className="border-b bg-white shadow-sm p-3 z-20">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full md:w-auto">
                <Input 
                  placeholder="Address, Neighborhood, or Zip" 
                  className="pl-3 pr-10 h-10 border-gray-300 focus:border-primary" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-primary cursor-pointer" />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Select value={priceMax} onValueChange={setPriceMax}>
                    <SelectTrigger className="w-[140px] h-10 border-gray-300">
                        <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any Price</SelectItem>
                        <SelectItem value="1000">$1,000+</SelectItem>
                        <SelectItem value="2000">$2,000+</SelectItem>
                        <SelectItem value="3000">$3,000+</SelectItem>
                        <SelectItem value="4000">$4,000+</SelectItem>
                        <SelectItem value="5000">$5,000+</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="w-[120px] h-10 border-gray-300">
                        <SelectValue placeholder="Beds" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any Beds</SelectItem>
                        <SelectItem value="1">1+ Bd</SelectItem>
                        <SelectItem value="2">2+ Bd</SelectItem>
                        <SelectItem value="3">3+ Bd</SelectItem>
                        <SelectItem value="4">4+ Bd</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={homeType} onValueChange={setHomeType}>
                    <SelectTrigger className="w-[140px] h-10 border-gray-300">
                        <SelectValue placeholder="Home Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="House">Houses</SelectItem>
                        <SelectItem value="Apartment">Apartments</SelectItem>
                        <SelectItem value="Condo">Condos</SelectItem>
                        <SelectItem value="Townhome">Townhomes</SelectItem>
                    </SelectContent>
                </Select>
                
                <Button variant="outline" className="h-10 border-primary text-primary hover:bg-primary/5" onClick={() => {
                    setSearch("");
                    setPriceMax("any");
                    setBedrooms("any");
                    setHomeType("any");
                }}>Save Search</Button>
            </div>
        </div>
      </div>

      {/* Split Layout: Map (Right) & List (Left) */}
      <div className="flex-1 flex overflow-hidden relative">
         {/* Right Side Map (Mobile hidden or stacked) */}
         <div className="hidden lg:block w-1/2 h-full relative z-0">
             <MapView 
                center={[34.0522, -118.2437]} 
                zoom={12}
                markers={mapMarkers}
                className="h-full w-full rounded-none border-none"
             />
             {/* Floating pill buttons on map */}
             <div className="absolute top-4 left-4 z-[400] flex gap-2">
                 <Button variant="secondary" size="sm" className="shadow-md bg-white text-gray-800 hover:bg-gray-100">Draw</Button>
                 <Button variant="secondary" size="sm" className="shadow-md bg-white text-gray-800 hover:bg-gray-100">Satellite</Button>
             </div>
         </div>

         {/* Left Side List */}
         <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 shadow-2xl z-10 bg-white">
             <div className="flex justify-between items-center mb-4 px-2">
                 <h2 className="text-xl font-bold text-gray-900">Real Estate & Homes For Rent</h2>
                 <span className="text-gray-500 text-sm">{filteredProperties.length} results</span>
             </div>
             
             <div className="mb-4 flex gap-2 px-2">
                 <span className="text-sm font-semibold text-primary border-b-2 border-primary cursor-pointer pb-1">Agent Listings</span>
                 <span className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer pb-1">Other Listings</span>
             </div>

             {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
             ) : (
                <div className="text-center py-20">
                    <p className="text-lg font-medium text-gray-900">No matching homes found</p>
                    <Button variant="link" onClick={() => {
                        setSearch("");
                        setPriceMax("any");
                        setBedrooms("any");
                        setHomeType("any");
                    }}>Reset all filters</Button>
                </div>
             )}
             
             <div className="mt-8 text-center text-xs text-gray-400 py-4 border-t">
                 Choice Properties Inc. | Updated every 5 minutes.
             </div>
         </div>
      </div>
    </div>
  );
}
