import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function Properties() {
  const allProperties = propertiesData as Property[];
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  
  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [bedrooms, setBedrooms] = useState("all");

  // Unique locations and types for dropdowns
  const locations = Array.from(new Set(allProperties.map(p => p.location)));
  const types = Array.from(new Set(allProperties.map(p => p.type)));

  useEffect(() => {
    let result = allProperties;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.address.toLowerCase().includes(query)
      );
    }

    if (location !== "all") {
      result = result.filter(p => p.location === location);
    }

    if (type !== "all") {
      result = result.filter(p => p.type === type);
    }

    if (bedrooms !== "all") {
      result = result.filter(p => p.bedrooms >= parseInt(bedrooms));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProperties(result);
  }, [search, location, type, priceRange, bedrooms, allProperties]);

  const clearFilters = () => {
    setSearch("");
    setLocation("all");
    setType("all");
    setPriceRange([0, 10000]);
    setBedrooms("all");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="bg-primary py-12 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Our Properties</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto px-4">
          Explore our diverse collection of rental properties designed to fit your lifestyle.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter Properties
            </h2>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-primary">
              <X className="h-4 w-4 mr-1" /> Clear Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Address, Title..." 
                  className="pl-8" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Location</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Type</SelectItem>
                  {types.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bedrooms (Min)</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <Label>Price Range</Label>
              <span className="font-medium text-primary">${priceRange[0]} - ${priceRange[1]}+</span>
            </div>
            <Slider 
              defaultValue={[0, 10000]} 
              max={10000} 
              step={100} 
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-4 text-muted-foreground">
          Showing {filteredProperties.length} properties
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-bold text-muted-foreground">No properties found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
            <Button onClick={clearFilters} variant="outline" className="mt-4">Reset Filters</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
